import React from "react";
import styles from "./Homepage.css";

export function ConceptDots() {
  return (
    <div className={styles.dotsContainer}>
      <div className={styles.dotsGroup}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dotsEnd}>
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
      <div className={styles.dotsBottom}>
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  );
}
