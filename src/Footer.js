import React from "react";
import styles from "./Footer.module.css";

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
};

const shareLink = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Check this out!',
        url: window.location.href,
      });
      console.log('Link shared successfully');
    } catch (err) {
      console.error('Error sharing:', err);
    }
  } else {
    alert('Sharing not supported on this browser. Please copy the link manually.');
  }
};

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

          <br />

          <div className={styles.subGroupRow} style={{ display: "flex", flexDirection: "row", gap: "13.6em" }}>
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

          <br />


          <div className={styles.subGroupRow} style={{ display: "flex", flexDirection: "row", gap: "5.5em" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>UI/UX Design:</span>
              <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
                <a
                  href="https://readymag.website/u3450179796/sanjanakadamportfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nameUnderline}
                >
                  Sanjana Kadam
                </a>
                <span>|</span>
                <a
                  href="https://bento.me/jimmykano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nameUnderline}
                >
                  Karan Kanojia
                </a>
              </div>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>Website Developer:</span>
              <div style={{ display: 'flex', gap: '0.5em', alignItems: 'center' }}>
                <a
                  href="https://www.linkedin.com/in/aryan-oberoi-1b4358195/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.websiteDevNames}`}
                >
                  Aryan Oberoi | Arham
                </a>
              </div>
            </div>
          </div>




          <div className={styles.subGroupRow} style={{ display: "flex", flexDirection: "row", gap: "10em" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>Book Design:</span>
              <span className={styles.name}>Shikha Sinai Usgaonker</span>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>Labels / Poster Design:</span>
              <a href="https://www.kultureshop.in/collections/aviral-saxena" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Aviral Saxena</a>
            </div>
          </div>

          <div className={styles.subGroupRow} style={{ display: "flex", flexDirection: "row", gap: "7.4em" }}>
            <div className={styles.subGroup}>
              <span className={styles.role}>Plant Illustrations:</span>
              <span className={styles.name}>Nandita Kumar</span>
            </div>

            <br />

            <div className={styles.subGroup}>
              <span className={styles.role}>Pollutant Illustrations:</span>
              <a href="https://www.behance.net/priyankabagade" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>Priyanka Bagade</a>
            </div>
          </div>

          <br />

          <div className={styles.subGroupRow} style={{ display: "flex", flexDirection: "row", gap: "8em" }}>
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
            {/* Start of changes for Researcher section */}
            <div className={styles.researcherList}>
              <a
                href="https://www.linkedin.com/in/tamoghno-paul"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                Tamoghno Paul
              </a>
              <span className={styles.researcherLine}></span> {/* Line separator */}
              <a
                href="https://www.linkedin.com/in/mithun-lakshmanan-8695a3199/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                Mithun Lakshmanan
              </a>
              <span className={styles.researcherLine}></span> {/* Line separator */}
              <span className={styles.name}>Prajakta Bodkhe</span> {/* Changed to span as it's not a link */}
              <span className={styles.researcherLine}></span> {/* Line separator */}
              <a
                href="https://carmelcollegegoa.org/team-members/ms-nezlyn-cressida-dsouza/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                Nezlyn D'Souza
              </a>
            </div>
            {/* End of changes for Researcher section */}
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.title}>Project Supported by:</span>
        <p className={styles.description} style={{ maxWidth: '725px' }}>
          This work was commissioned within the framework of the S+T+ARTS 4Water II residency program by <span >TBA21–Academy </span>with the support of <span >Konsortium Deutsche Meeresforschung (KDM) </span>within the Prep4Blue project as a contribution to the EU Restore our Ocean and Waters by 2030, and with the collaboration of <span >Ca' Foscari, CNR-ISMAR, ETT, and Venice International University.</span>

          <br /><br />Initial Support: <a href="https://leonardo.info/imagination-fellowship" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline} >ASU Leonardo Imagination Fellowship</a>, <a href="https://www.unesco.org/en/futures-literacy" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>UNESCO FUTURE Literacy</a>, <a href="https://www.awesomefoundation.org/en/projects/165230-sounding-the-invisible-an-elegant-symbiosis" target="_blank" rel="noopener noreferrer" className={styles.nameUnderline}>The Awesome Foundation</a>.
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <center>
        <div className={styles.section}>
          <div className={styles.imageContainer}>

            <button onClick={shareToFacebook} style={{ marginRight: '10px', background: "none", border: "none", padding: 0 }}>
              <img src="facebook.png" alt="Facebook" className={styles.supporterImage} />
            </button>
            <button onClick={shareLink} style={{ marginRight: '10px', background: "none", border: "none", padding: 0 }}>
              <img src="instagram.png" alt="Instagram" className={styles.supporterImage} />
            </button>
            <button onClick={shareToTwitter} style={{ marginRight: '10px', background: "none", border: "none", padding: 0 }}>
              <img src="twitter.png" alt="Twitter" className={styles.supporterImage} />
            </button>
            <button onClick={shareLink} style={{ background: "none", border: "none", padding: 0 }}>
              <img src="share.png" alt="Share Link" className={styles.supporterImage} />
            </button>
          </div>
          <p className={styles.description}>
            {/* <img src="copyright.png" alt="Copyright" className={styles.supporterImage} style={{ marginRight: '8px', padding }} /> */}
            <span style={{ marginRight: '5px', fontSize: '29px', paddingTop: '0px' }}>&copy;</span>
            <span style={{ fontFamily: "nippo", fontWeight: 300, letterSpacing: '1px' }}>NANDITA KUMAR</span> <span style={{ fontFamily: "nippo-light", fontWeight: 200, letterSpacing: '1px' }}>
              2025
            </span>

          </p>
        </div>
      </center>
    </div>
  );
};