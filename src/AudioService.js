// src/services/AudioService.js
// Seamless loop engine — per-source equal-power fades for IN and OUT,
// no group-level fade that collapses when switching pads.

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:6000";

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);
const nowMs = () => performance.now();

/* ---------- equal-power curve builder ---------- */
function buildEqualPowerCurve(samples, fadeIn = true) {
  const arr = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const t = i / (samples - 1);
    const theta = t * Math.PI * 0.5; // 0..π/2
    arr[i] = fadeIn ? Math.sin(theta) : Math.cos(theta);
  }
  // avoid exact zeros
  for (let i = 0; i < samples; i++) arr[i] = Math.max(arr[i], 0.000001);
  return arr;
}

/* ---------- LoopPlayer: per-pad crossfading looper ---------- */
class LoopPlayer {
  constructor(ctx, masterGain, audioBuffer, {
    volume = 1.0,
    fadeInMs = 800,
    xfadeMs = 450,
    curveSamples = 128,
  } = {}) {
    this.ctx = ctx;
    // groupGain stays at unity — don't fade it. Per-source gains handle fades.
    this.groupGain = ctx.createGain();
    this.groupGain.gain.value = 1.0;
    this.groupGain.connect(masterGain);

    this.buf = audioBuffer;
    this.targetVol = clamp(volume, 0, 1);
    this.fadeInMs = Math.max(10, fadeInMs);
    this.xfadeMs = Math.max(40, Math.min(5000, xfadeMs));
    this.curveSamples = Math.max(16, curveSamples);

    this._a = null; // { src, gain, startTime }
    this._b = null;
    this._playing = false;
    this._tickId = null;

    // curves (base 0..1); when applying IN we scale by targetVol
    this._inCurveBase = buildEqualPowerCurve(this.curveSamples, true);
    this._outCurveBase = buildEqualPowerCurve(this.curveSamples, false);

    this._scheduled = new WeakSet();
  }

  _makeSource() {
    const src = this.ctx.createBufferSource();
    src.buffer = this.buf;
    const g = this.ctx.createGain();
    g.gain.value = 0.000001; // start silent
    src.connect(g).connect(this.groupGain);
    return { src, gain: g, startTime: 0 };
  }

  // Apply a value-curve to the gainNode but scale the curve by a factor (used to scale IN curve to targetVol)
  _applyScaledCurve(gainNode, baseCurve, scale, atSec, durMs) {
    const t = atSec;
    const scaled = new Float32Array(baseCurve.length);
    for (let i = 0; i < baseCurve.length; i++) scaled[i] = Math.max(baseCurve[i] * scale, 0.000001);
    try {
      gainNode.gain.cancelScheduledValues(t);
      gainNode.gain.setValueCurveAtTime(scaled, t, durMs / 1000);
    } catch {
      // fallback: exponential ramp
      gainNode.gain.setValueAtTime(gainNode.gain.value || 0.000001, t);
      gainNode.gain.exponentialRampToValueAtTime(Math.max(0.000001, scale), t + durMs / 1000);
    }
  }

  start() {
    if (this._playing) return;
    this._playing = true;

    // Create and start first source slightly in the future
    this._a = this._makeSource();
    const tStart = this.ctx.currentTime + 0.03;
    this._a.startTime = tStart;
    this._a.src.start(tStart);

    // Apply IN curve (scaled by targetVol) to the very first source for smooth fade-in
    this._applyScaledCurve(this._a.gain, this._inCurveBase, this.targetVol, tStart, this.fadeInMs);

    this._tick();
  }

  _tick() {
    if (!this._playing) return;

    const durSec = this.buf.duration;
    const xfadeSec = this.xfadeMs / 1000;
    const cur = this._b || this._a;
    if (!cur) return;

    const nextStart = cur.startTime + durSec - xfadeSec;

    // schedule next source within a short look-ahead window
    if (this.ctx.currentTime >= nextStart - 0.03 && !this._scheduled.has(cur)) {
      const next = this._makeSource();
      next.startTime = nextStart;
      next.src.start(nextStart);

      // Equal-power crossfade: IN curve scaled to targetVol; OUT curve (base) scaled by 1
      this._applyScaledCurve(next.gain, this._inCurveBase, this.targetVol, nextStart, this.xfadeMs);
      this._applyScaledCurve(cur.gain,  this._outCurveBase, 1.0,      nextStart, this.xfadeMs);

      // stop old after crossfade completes
      const stopAtMs = (nextStart + xfadeSec) * 1000;
      setTimeout(() => { try { cur.src.stop(0); } catch {} }, Math.max(0, stopAtMs - nowMs()));

      // rotate
      this._scheduled.add(cur);
      if (cur === this._a) this._b = next; else this._a = next;
    }

    this._tickId = setTimeout(() => this._tick(), 33);
  }

  // Stop by fading OUT per-source gains (do NOT touch groupGain)
  async stop(fadeMs = 700) {
    if (!this._playing) return;
    clearTimeout(this._tickId);
    this._tickId = null;
    this._playing = false;

    const t = this.ctx.currentTime;

    // Apply OUT curve scaled to current source levels (we assume 1 inside)
    if (this._a?.gain) this._applyScaledCurve(this._a.gain, this._outCurveBase, 1.0, t, fadeMs);
    if (this._b?.gain) this._applyScaledCurve(this._b.gain, this._outCurveBase, 1.0, t, fadeMs);

    const doneAt = (t + fadeMs / 1000) * 1000;
    await new Promise(res => setTimeout(res, Math.max(0, doneAt - nowMs())));

    [this._a, this._b].forEach(r => { if (r?.src) { try { r.src.stop(0); } catch {} } });
    this._a = this._b = null;
  }

  // Fade down per-source gains to a new target (used when adjusting volume)
  setVolume(v, rampMs = 160) {
    this.targetVol = clamp(v, 0, 1);
    // Smoothly change future IN scaling by adjusting an immediate tiny ramp on group? 
    // We keep groupGain at 1 and rely on newly scheduled IN curves to respect new targetVol.
    // For live adjustment, also scale current sources linearly (approx) for continuity:
    const t = this.ctx.currentTime;
    const curA = this._a?.gain, curB = this._b?.gain;
    [curA, curB].forEach(gNode => {
      if (!gNode) return;
      try {
        gNode.gain.cancelScheduledValues(t);
        // multiply current value by targetVol (quick linear-ish ramp)
        gNode.gain.setTargetAtTime(Math.max(0.000001, this.targetVol), t, Math.max(0.02, rampMs / 1000 / 5));
      } catch {}
    });
  }
}

/* ---------- AudioService (uses LoopPlayer) ---------- */
class AudioService {
  constructor() {
    this.audioContext = null;
    this.masterGain = null; // master volume left at 1.0

    this.cachedBuffers = {};
    this.players = {};      // pad -> LoopPlayer
    this.oneShots = {};     // pad -> { src, gain }

    this.currentlyPlayingExclusiveLoop = null;
    this.ambientSoundPad = "999";

    this.isMuted = localStorage.getItem("audioEnabled") === "false";
    this.elementToPadMapping = {};
    this._categorizedData = null;
  }

  _ensureContextIsRunning() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.gain.value = 1.0;
        this.masterGain.connect(this.audioContext.destination);
      } catch (e) {
        console.error("[AudioService] Web Audio unsupported.", e);
        return false;
      }
    }
    if (this.audioContext.state === "suspended") this.audioContext.resume();
    return true;
  }

  init(categorizedData) {
    if (Array.isArray(categorizedData) && categorizedData.length) {
      this._categorizedData = categorizedData;
      this.buildElementToPadMapping(categorizedData);
    }
    const initAudio = () => {
      if (this._ensureContextIsRunning()) this.preloadCommonSounds();
      document.removeEventListener("click", initAudio);
      document.removeEventListener("keydown", initAudio);
    };
    document.addEventListener("click", initAudio, { once: true });
    document.addEventListener("keydown", initAudio, { once: true });
  }

  resetAllAudioState() {
    this.stopAllSounds(500);
    this.currentlyPlayingExclusiveLoop = null;
    this.isMuted = false;
    localStorage.setItem("audioEnabled", "true");
    this.dispose();
  }

  dispose() {
    Object.values(this.players).forEach(p => { try { p.stop(0); } catch {} });
    Object.values(this.oneShots).forEach(({ src }) => { try { src.stop(0); } catch {} });
    this.players = {};
    this.oneShots = {};
    this.cachedBuffers = {};
  }

  buildElementToPadMapping(rows) {
    const variants = {
      aluminum: "aluminium", thalium: "thallium",
      "estrogen-pills": "estrogen", "organic-matter": "organicmatter",
      crude: "crudeoil"
    };
    rows.forEach(r => {
      if (!r?.id || !r?.Number) return;
      const id = String(r.id).trim().toLowerCase();
      const pad = String(r.Number);
      this.elementToPadMapping[id] = pad;
      this.elementToPadMapping[id.replace(/-/g, "")] = pad;
      this.elementToPadMapping[id.replace(/-/g, " ")] = pad;
    });
    Object.entries(variants).forEach(([v, s]) => {
      if (this.elementToPadMapping[s]) this.elementToPadMapping[v] = this.elementToPadMapping[s];
    });
  }

  async playElementSound(elementId, options = {}) {
    if (this.isMuted) return null;
    if (!elementId) return null;
    const lookup = String(elementId).toLowerCase().replace(/\s+/g, "");
    const pad = this.elementToPadMapping[lookup];
    if (!pad) return null;
    return this.playPadSound(pad, options);
  }

  stopElementSound(elementId, fadeOutMs = 500) {
    if (!elementId) return Promise.resolve();
    const lookup = String(elementId).toLowerCase().replace(/\s+/g, "");
    const pad = this.elementToPadMapping[lookup];
    if (!pad) return Promise.resolve();
    return this.stopPadSound(pad, fadeOutMs);
  }

  async playPadSound(padNumber, options = {}) {
    if (this.isMuted || !this._ensureContextIsRunning()) return null;

    const {
      loop = false,
      volume = 1.0,
      fadeIn = true,
      fadeInDuration = 800,
      xfadeMs = 450,
    } = options;

    // Exclusive loop policy: if another exclusive loop is playing, we *don't* kill it
    // by fading its group to zero. Instead, we fade-out its per-source gains only
    // so the switching crossfade won't collapse.
    if (padNumber !== this.ambientSoundPad) {
      if (this.currentlyPlayingExclusiveLoop && this.currentlyPlayingExclusiveLoop !== padNumber) {
        // fade out existing exclusive player's per-source gains (quick) but allow overlap
        const prevPad = this.currentlyPlayingExclusiveLoop;
        const prevPlayer = this.players[prevPad];
        if (prevPlayer) {
          // fade prev out gently, but not touching master/group gain
          prevPlayer.stop(Math.min(1200, fadeInDuration));
          delete this.players[prevPad];
        }
      }
      this.currentlyPlayingExclusiveLoop = loop ? padNumber : null;
    }

    const buffer = await this._getAudioBuffer(padNumber);
    if (!buffer) return null;

    // Ensure any existing playback for pad is stopped (per-source fade)
    if (this.players[padNumber]) {
      await this.players[padNumber].stop(80);
      delete this.players[padNumber];
    }
    if (this.oneShots[padNumber]) {
      // quick fade out of one-shot
      const shot = this.oneShots[padNumber];
      delete this.oneShots[padNumber];
      shot.gain.gain.cancelScheduledValues(this.audioContext.currentTime);
      shot.gain.gain.exponentialRampToValueAtTime(0.000001, this.audioContext.currentTime + 0.08);
      try { shot.src.stop(this.audioContext.currentTime + 0.1); } catch {}
    }

    if (loop) {
      const player = new LoopPlayer(this.audioContext, this.masterGain, buffer, {
        volume,
        fadeInMs: fadeIn ? fadeInDuration : 10,
        xfadeMs,
        curveSamples: 128,
      });
      this.players[padNumber] = player;
      player.start();
      return { stop: (ms) => this.stopPadSound(padNumber, ms) };
    }

    // One-shot (non-loop)
    const src = this.audioContext.createBufferSource();
    const g = this.audioContext.createGain();
    g.gain.value = 0.000001;
    src.buffer = buffer;
    src.connect(g).connect(this.masterGain);
    src.start(this.audioContext.currentTime + 0.01);

    const useFadeIn = fadeIn ? fadeInDuration : 0;
    if (useFadeIn > 0) {
      // simple exponential ramp to volume (one-shots don't need curves usually)
      g.gain.cancelScheduledValues(this.audioContext.currentTime);
      g.gain.setValueAtTime(0.000001, this.audioContext.currentTime);
      g.gain.exponentialRampToValueAtTime(clamp(volume, 0.001, 1), this.audioContext.currentTime + (useFadeIn / 1000));
    } else {
      g.gain.setValueAtTime(clamp(volume, 0, 1), this.audioContext.currentTime);
    }

    this.oneShots[padNumber] = { src, gain: g };
    src.onended = () => { if (this.oneShots[padNumber]?.src === src) delete this.oneShots[padNumber]; };

    return { stop: (ms) => this.stopPadSound(padNumber, ms) };
  }

  async _getAudioBuffer(padNumber) {
    if (this.cachedBuffers[padNumber]) return this.cachedBuffers[padNumber];
    if (!this.audioContext) return null;

    // ping backend (fire-and-forget)
    fetch(`${API_URL}/play_pad`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pad: padNumber })
    }).catch(() => {});

    try {
      const resp = await fetch(`/sounds/${padNumber}.mp3`);
      if (!resp.ok) throw new Error(`Missing /sounds/${padNumber}.mp3`);
      const ab = await resp.arrayBuffer();
      const buf = await this.audioContext.decodeAudioData(ab);
      this.cachedBuffers[padNumber] = buf;
      return buf;
    } catch (e) {
      console.error(`[AudioService] Failed to load pad ${padNumber}:`, e);
      return null;
    }
  }

  async stopPadSound(padNumber, fadeOutMs = 500) {
    // prefer per-source fade stop for loop players
    if (this.players[padNumber]) {
      const p = this.players[padNumber];
      delete this.players[padNumber];
      if (this.currentlyPlayingExclusiveLoop === padNumber) this.currentlyPlayingExclusiveLoop = null;
      await p.stop(fadeOutMs);
      return;
    }

    const shot = this.oneShots[padNumber];
    if (shot) {
      delete this.oneShots[padNumber];
      shot.gain.gain.cancelScheduledValues(this.audioContext.currentTime);
      shot.gain.gain.setValueAtTime(Math.max(0.000001, shot.gain.gain.value), this.audioContext.currentTime);
      shot.gain.gain.exponentialRampToValueAtTime(0.000001, this.audioContext.currentTime + fadeOutMs / 1000);
      const doneAt = (this.audioContext.currentTime + fadeOutMs / 1000) * 1000;
      await new Promise(res => setTimeout(res, Math.max(0, doneAt - nowMs())));
      try { shot.src.stop(0); } catch {}
    }
  }

  async stopAllSounds(fadeOutMs = 500) {
    const promises = [];
    Object.keys(this.players).forEach(p => promises.push(this.stopPadSound(p, fadeOutMs)));
    Object.keys(this.oneShots).forEach(p => promises.push(this.stopPadSound(p, fadeOutMs)));
    await Promise.all(promises);
    this.currentlyPlayingExclusiveLoop = null;
  }

  async toggleMute(muted, rampMs = 250) {
    this.isMuted = muted;
    localStorage.setItem("audioEnabled", String(!muted));
    if (!this._ensureContextIsRunning()) return;
    const t = this.audioContext.currentTime;
    const g = this.masterGain.gain;
    g.cancelScheduledValues(t);
    const target = muted ? 0.000001 : 1.0;
    g.setTargetAtTime(target, t, rampMs / 1000 / 5);

    if (muted) await this.stopAllSounds(300);
    else await this.playAmbientSound(0.8, 500);
  }

  async playAmbientSound(volume = 0.8, fadeInDuration = 700) {
    if (this.isMuted) return null;
    if (this.players[this.ambientSoundPad]) {
      this.players[this.ambientSoundPad].setVolume(volume);
      return { stop: (ms) => this.stopPadSound(this.ambientSoundPad, ms) };
    }
    return this.playPadSound(this.ambientSoundPad, {
      loop: true,
      volume,
      fadeInDuration,
      xfadeMs: 500,
    });
  }

  async stopAmbientSound(fadeOutMs = 600) {
    await this.stopPadSound(this.ambientSoundPad, fadeOutMs);
  }

  preloadCommonSounds() {
    if (!this._categorizedData || !this.audioContext) return;
    const pads = Array.from({ length: 36 }, (_, i) => String(i + 1));
    pads.unshift(this.ambientSoundPad);
    let i = 0;
    const next = async () => {
      if (i >= pads.length) return;
      const pad = pads[i++];
      try { await this._getAudioBuffer(pad); } catch {}
      setTimeout(next, 80);
    };
    next();
  }
}

const audioService = new AudioService();
export default audioService;
