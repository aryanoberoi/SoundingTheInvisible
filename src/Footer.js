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

          <div className={styles.subGroup} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={styles.role}>Sound Design:</span>
              <a
                href="https://www.kariraeseekins.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                Kari Rae Seekins
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={styles.role}>Creative Coder for Sound Engagement:</span>
              <a
                href="https://www.linkedin.com/in/khoparzi/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                Abhinay Khoparzi
              </a>
            </div>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Circuit Board Design:</span>
            <span className={styles.name}>Prateek Jha</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>UI/UX Design:</span>
              <a href="https://readymag.website/u3450179796/sanjanakadamportfolio/" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Sanjana Kadam</a> | 
              <a href="https://bento.me/jimmykano" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Karan Kanojia</a>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>Web Developer:</span>
              <a href="https://www.linkedin.com/in/aryan-oberoi-1b4358195/" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Aryan Oberoi</a> | 
              <a href="https://example.com/arham" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Arham</a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>Book Design:</span>
              <span className={styles.name}>Shikha Sinai Usgaonker</span>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>Labels / Poster Design:</span>
              <a href="https://www.kultureshop.in/collections/aviral-saxena" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Aviral Saxena</a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>Plant Illustrations:</span>
              <span className={styles.name}>Nandita Kumar</span>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>Pollutant Illustrations:</span>
              <a href="https://www.behance.net/priyankabagade" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Priyanka Bagade</a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "30%" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>Editor:</span>
              <span className={styles.name}>Anjali Singh Uttamchandani</span>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>Introduction Text:</span>
              <a href="https://www.adwaitsingh.com/" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Adwait Singh</a>
            </div>
          </div>

          <div className={styles.subGroup}>
            <span className={styles.role}>Researcher:</span>
            <span className={styles.nameUnderline}>
              <a href="https://www.linkedin.com/in/tamoghno-paul" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Tamoghno Paul</a> | 
              <a href="https://www.linkedin.com/in/mithun-lakshmanan-8695a3199/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Mithun Lakshmanan</a> | 
              Prajakta Bodkhe | 
              <a href="https://carmelcollegegoa.org/team-members/ms-nezlyn-cressida-dsouza/" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Nezlyn D'Souza</a>
            </span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.title}>Project Supported by:</span>
        <p className={styles.description}>
          This work was commissioned within the framework of the S+T+ARTS 4Water II residency program by TBA21–Academy with the support of Konsortium Deutsche Meeresforschung (KDM) within the Prep4Blue project as a contribution to the EU Restore our Ocean and Waters by 2030, and with the collaboration of Ca' Foscari, CNR-ISMAR, ETT, and Venice International University. 
          <br /><br />Initial Support: <a href="https://leonardo.info/imagination-fellowship" target="_blank" rel="noopener noreferrer">ASU Leonardo Imagination Fellowship</a>, <a href="https://www.unesco.org/en/futures-literacy" target="_blank" rel="noopener noreferrer">UNESCO FUTURE Literacy</a>, <a href="https://www.awesomefoundation.org/en/projects/165230-sounding-the-invisible-an-elegant-symbiosis" target="_blank" rel="noopener noreferrer">The Awesome Foundation</a>.
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <center>
      <div className={styles.section}>
        <div className={styles.imageContainer}>
          <a
            href="facebook.png"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            <img src="instagram.png" alt="Supporter 1" className={styles.supporterImage} />
          </a>
          <a
            href="path/to/image2.png"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            <img src="facebook.png" alt="Supporter 2" className={styles.supporterImage} />
          </a>
          <a
            href="path/to/image3.png"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            <img src="twitter.png" alt="Supporter 3" className={styles.supporterImage} />
          </a>
          <a
            href="path/to/image3.png"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <img src="share.png" alt="Supporter 3" className={styles.supporterImage} />
          </a>
        </div>
        <p className={styles.description}>
          <a
            href="path/to/image3.png"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: '10px', textDecoration: 'none' }}
          >
            <img src="copyright.png" alt="Supporter 3" className={styles.supporterImage} />
          </a>
NANDITA KUMAR 2025
        </p>
      </div>
      </center>
    </div>
  );
};
