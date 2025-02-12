import React from "react";
import styles from "./Homepage.css";
import { ConceptDots } from "./ConceptDots";

export function ConceptSection() {
  return (
    <section className={styles.conceptSection}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/74003d4090f30d7918b268263528bb62d3ef772eddacd4be879cec2b69fc899c"
        className={styles.conceptImage}
        alt="Concept visual"
      />
      <div className={styles.conceptContent}>
        <div className={styles.conceptLayout}>
          <article className={styles.conceptArticle}>
            <h2 className={styles.conceptTitle}>Concept</h2>
            <p className={styles.conceptDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse congue mollis mauris eget faucibus. Donec fermentum
              nibh ut gravida imperdiet. Donec diam velit, bibendum in volutpat
              quis, ullamcorper eu neque. Etiam rhoncus erat non quam vehicula.
            </p>
          </article>
          <div className={styles.conceptVisual}>
            <div className={styles.visualContainer}>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/626056e954b5d7779b52182b95c2f6e0c069bc092a27d67b395539d4710b02db"
                className={styles.visualImage}
                alt="Concept illustration"
              />
              <ConceptDots />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
