import React from "react";
import styles from "./Homepage.css";
import { SoundDots } from "./SoundDots";

export function SoundSection() {
  return (
    <section className={styles.soundSection}>
      <div className={styles.soundLayout}>
        <div className={styles.soundVisual}>
          <div className={styles.visualWrapper}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/c64acb7a79f15c8e426ab99a64eca24bfa635af465591df0ac100dbd90325275"
              className={styles.soundImage}
              alt="Sound concept visual"
            />
            <SoundDots />
          </div>
        </div>
        <article className={styles.soundContent}>
          <div className={styles.soundText}>
            <div className={styles.whiteDot} />
            <p className={styles.soundDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse congue mollis mauris eget faucibus. Donec fermentum
              nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
              quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
            </p>
          </div>
        </article>
      </div>
      <div className={styles.creditsSection}>
        <div className={styles.creditsLayout}>
          <div className={styles.creditsColumns}>
            <article className={styles.creditsArticle}>
              <h2 className={styles.soundConceptTitle}>Sound concept</h2>
              <p className={styles.creditsDescription}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse congue mollis mauris eget faucibus. Donec fermentum
                nibh ut gravida imperdiet. Donec diam velit, bibendum in
                volutpat quis, ullamcorper eu neque. Etiam rhoncus erat non quam
                vehicula.
              </p>
            </article>
            <div className={styles.creditsVisual}>
              <div className={styles.creditsImageContainer}>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/8c67f504bca0584b41bc0b84940a27912a15cc1e4b579a98e504483ea2c5e0d5"
                  className={styles.creditsImage}
                  alt="Credits visual"
                />
                <div className={styles.creditsDots}>
                  <div className={styles.whiteDot} />
                  <div className={styles.dotsColumn}>
                    <div className={styles.whiteDot} />
                    <div className={styles.whiteDot} />
                    <div className={styles.dotsRow}>
                      <div className={styles.whiteDot} />
                      <div className={styles.dotsInner}>
                        <div className={styles.whiteDot} />
                        <div className={styles.whiteDot} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h2 className={styles.creditsTitle}>Credits</h2>
      </div>
    </section>
  );
}
