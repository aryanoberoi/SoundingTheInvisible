import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.section}>
        <span className={styles.title}>Production Credits</span>
        <div className={styles.group}>
          <div className={styles.subGroup}>
            <span className={styles.role}>Artist + Conceptualiser + Project Management:</span>
            <span className={styles.name}>Nandita Kumar</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Sound Design:</span>
            <span className={styles.nameUnderline}>Kari Rae Seekins</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Creative Coder for Sound Engagement:</span>
            <span className={styles.nameUnderline}>Abhinay Khoparzi</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Circuit Board Design:</span>
            <span className={styles.name}>Prateek Jha</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>UI/UX Design:</span>
            <span className={styles.name}>Sanjana Kadam | Karan Kanojia</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Web Developer:</span>
            <span className={styles.name}>Aryan Oberoi | Arham </span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Book Design:</span>
            <span className={styles.name}>Shikha Sinai Usgaonker</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Labels / Poster Design:</span>
            <span className={styles.nameUnderline}>Aviral Saxena</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Plant Illustrations:</span>
            <span className={styles.name}>Nandita Kumar</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Pollutant Illustrations:</span>
            <span className={styles.nameUnderline}>Priyanka Bagade</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Editor:</span>
            <span className={styles.name}>Anjali Singh Uttamchandani</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Introduction Text:</span>
            <span className={styles.nameUnderline}>Adwait Singh</span>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Researcher:</span>
            <span className={styles.nameUnderline}>
              Tamoghno Paul | Mithun Lakshmanan | Prajakta Bodkhe | Nezlyn D'Souza
            </span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.title}>Project Supported by:</span>
        <p className={styles.description}>
          This work was commissioned within the framework of the S+T+ARTS 4Water II residency program by TBA21–Academy with 
          the support of Konsortium Deutsche Meeresforschung (KDM) and with the collaboration of Ca' Foscari, CNR-ISMAR, 
          ETT, and Venice International University and the S+T+ARTS program of the European Union. Initial Support: ASU 
          Leonardo Imagination Fellowship, UNESCO FUTURE Literacy, The Awesome Foundation.
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <center>
      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <a href="facebook.png" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
            <img src="instagram.png" alt="Supporter 1" className={styles.supporterImage} />
          </a>
          <a href="path/to/image2.png" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
            <img src="facebook.png" alt="Supporter 2" className={styles.supporterImage} />
          </a>
          <a href="path/to/image3.png" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
            <img src="twitter.png" alt="Supporter 3" className={styles.supporterImage} />
          </a>
          <a href="path/to/image3.png" target="_blank" rel="noopener noreferrer">
            <img src="share.png" alt="Supporter 3" className={styles.supporterImage} />
          </a>
        </div>
        <p className={styles.description}>
        <a href="path/to/image3.png" target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
            <img src="copyright.png" alt="Supporter 3" className={styles.supporterImage} />
          </a>
NANDITA KUMAR 2025
        </p>
      </div>
      </center>
    </div>
    
  );
};
