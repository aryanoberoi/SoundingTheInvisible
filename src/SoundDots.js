import React from "react";
import styles from "./Homepage.css";

export function SoundDots() {
  return (
    <div className={styles.soundDotsContainer}>
      <div className={styles.soundDotsGroup}>
        <div className={styles.whiteDot} />
        <div className={styles.soundDotsColumn}>
          <div className={styles.whiteDot} />
          <div className={styles.whiteDot} />
          <div className={styles.whiteDot} />
        </div>
        <div className={styles.whiteDot} />
      </div>
      <div className={styles.whiteDot} />
      <div className={styles.whiteDot} />
      <div className={styles.whiteDot} />
      <div className={styles.whiteDot} />
      <div className={styles.whiteDot} />
    </div>
  );
}
