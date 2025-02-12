import React from "react";
import styles from "./Homepage.css";

export function HeroSection() {
  return (
    <header className={styles.header}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/3588bc21f2224826afdf507ac8287e41/c6dd33c4a00b37ee265456a1dbc491869bb1b32a56640562df0a52966619a75b"
        className={styles.logo}
        alt="Logo"
      />
      <p className={styles.heroText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        congue mollis mauris eget faucibus. Donec fermentum nibh ut gravida
        imperdiet.
      </p>
    </header>
  );
}
