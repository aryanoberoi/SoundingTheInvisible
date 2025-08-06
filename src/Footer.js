import React, { useEffect, useState } from "react";
import styles from "./Footer.module.css";

const shareToFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
};

const shareToTwitter = () => {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title);
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    "_blank"
  );
};

const shareLink = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Check this out!",
        url: window.location.href,
      });
      console.log("Link shared successfully");
    } catch (err) {
      console.error("Error sharing:", err);
    }
  } else {
    alert(
      "Sharing not supported on this browser. Please copy the link manually."
    );
  }
};

export const Footer = () => {
  React.useEffect(() => {
    const handleResize = () => {
      const researcherDiv = document.querySelector(".researcher-inline");
      if (researcherDiv) {
        if (window.innerWidth <= 768) {
          researcherDiv.style.display = "grid";
          researcherDiv.style.gridTemplateColumns = "repeat(2, auto)";
          researcherDiv.style.rowGap = "6px";
          researcherDiv.style.columnGap = "12px";
        } else {
          researcherDiv.style.display = "flex";
          researcherDiv.style.flexWrap = "nowrap";
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    fetch("https://opensheet.vercel.app/1RY--tShylE4tNaO-jr1utv9uaTHSXabK-UXqr3eORV4/Sheet1")
      .then((res) => res.json())
      .then((data) => setSheetData(data))
      .catch((err) => console.error("Failed to fetch sheet data:", err));
  }, []);

  return (
    <div className={styles.footerContainer}>
      <div className={styles.section}>
        <span className={styles.title}>Production Credits</span>
        <div className={styles.group}>
          <div className={styles.subGroup}>
            <span className={styles.role}>
              {sheetData[0]?.Role_1}
            </span>
            <span className={styles.name}>{sheetData[0]?.Name_1}</span>
          </div>

          <br />

          <div
            className={styles.subGroupRow}
            style={{ display: "flex", flexDirection: "row", gap: "13.6em" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={styles.role}>{sheetData[0]?.Role_2}</span>
              <a
                href="https://www.kariraeseekins.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >

                {sheetData[0]?.Name_2}
              </a>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className={styles.role}>
                {sheetData[0]?.Role_3}              </span>
              <a
                href="https://www.linkedin.com/in/khoparzi/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_3}              </a>
            </div>
          </div>
          <div className={styles.subGroup}>
            <span className={styles.role}>{sheetData[0]?.Role_4}</span>
            <span className={styles.name}>{sheetData[0]?.Name_4}</span>
          </div>

          <br />

          <div
            className={styles.subGroupRow}
            style={{ display: "flex", flexDirection: "row", gap: "5.5em" }}
          >
            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_5}</span>
              <div
                style={{ display: "flex", gap: "0.5em", alignItems: "center" }}
              >
                <a
                  href="https://readymag.website/u3450179796/sanjanakadamportfolio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nameUnderline}
                >
                  {sheetData[0]?.Name_5i}
                </a>
                {/* <span>|</span> */}
                <a
                  href="https://bento.me/jimmykano"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.nameUnderline}
                >
                  {sheetData[0]?.Name_5ii}
                </a>
              </div>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_6}</span>
              <div
                style={{ display: "flex", gap: "0.5em", alignItems: "center" }}
              >
                <a
                  href="https://www.linkedin.com/in/aryan-oberoi-1b4358195/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.websiteDevNames}`}
                >
                  {sheetData[0]?.Name_6}
                </a>
              </div>
            </div>
          </div>

          <div
            className={styles.subGroupRow}
            style={{ display: "flex", flexDirection: "row", gap: "10em" }}
          >
            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_7}</span>
              <span className={styles.name}>{sheetData[0]?.Name_7}</span>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_8}</span>
              <a
                href="https://www.kultureshop.in/collections/aviral-saxena"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_8}
              </a>
            </div>
          </div>

          <div
            className={styles.subGroupRow}
            style={{ display: "flex", flexDirection: "row", gap: "7.4em" }}
          >
            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_9}</span>
              <span className={styles.name}>{sheetData[0]?.Name_9}</span>
            </div>

            <br />

            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_10}</span>
              <a
                href="https://www.behance.net/priyankabagade"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_10}
              </a>
            </div>
          </div>

          <br />

          <div
            className={styles.subGroupRow}
            style={{ display: "flex", flexDirection: "row", gap: "8em" }}
          >
            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_11}</span>
              <span className={styles.name}>{sheetData[0]?.Name_11}</span>
            </div>

            <div className={styles.subGroup}>
              <span className={styles.role}>{sheetData[0]?.Role_12}</span>
              <a
                href="https://www.adwaitsingh.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_12}
              </a>
            </div>
          </div>

                     <div className={styles.subGroup}>
            <span className={styles.role}>{sheetData[0]?.Role_13}</span>
            {/* Start of changes for Researcher section */}
            <div className={styles.researcherList}>
              <a
                href="https://www.linkedin.com/in/tamoghno-paul"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_13i}
              </a>
              {/* <span className={styles.researcherLine}></span> Line separator */}
              <a
                href="https://www.linkedin.com/in/mithun-lakshmanan-8695a3199/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_13ii}
              </a>
              {/* <span className={styles.researcherLine}></span> Line separator */}
              <span className={styles.name}>{sheetData[0]?.Name_13iii}</span> {/* Changed to span as it's not a link */}
              {/* <span className={styles.researcherLine}></span> Line separator */}
              <a
                href="https://carmelcollegegoa.org/team-members/ms-nezlyn-cressida-dsouza/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.nameUnderline}
              >
                {sheetData[0]?.Name_13iv}
              </a>
            </div>
            {/* End of changes for Researcher section */}
          </div>

        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.title}>Project Supported by:</span>
        <p className={styles.description} style={{ maxWidth: "725px" }}>
          {sheetData[0]?.Full_Desc}
          <br />
          <br />
          Initial Support:{" "}
          <a
            href="https://leonardo.info/imagination-fellowship"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameUnderline}
          >
           {sheetData[0]?.ISi}
          </a>
          ,{" "}
          <a
            href="https://www.unesco.org/en/futures-literacy"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameUnderline}
          >
            {sheetData[0]?.ISii}
          </a>
          ,{" "}
          <a
            href="https://www.awesomefoundation.org/en/projects/165230-sounding-the-invisible-an-elegant-symbiosis"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.nameUnderline}
          >
            {sheetData[0]?.ISiii}
          </a>
          .
        </p>
      </div>
      <br />
      <br />
      <br />
      <br />
      <center>
        <div className={styles.section}>
          <div className={styles.imageContainer}>
            <button
              onClick={shareToFacebook}
              style={{
                marginRight: "10px",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <img
                src="facebook.png"
                alt="Facebook"
                className={styles.supporterImage}
              />
            </button>
            <button
              onClick={shareLink}
              style={{
                marginRight: "10px",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <img
                src="instagram.png"
                alt="Instagram"
                className={styles.supporterImage}
              />
            </button>
            <button
              onClick={shareToTwitter}
              style={{
                marginRight: "10px",
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <img
                src="twitter.png"
                alt="Twitter"
                className={styles.supporterImage}
              />
            </button>
            <button
              onClick={shareLink}
              style={{ background: "none", border: "none", padding: 0 }}
            >
              <img
                src="share.png"
                alt="Share Link"
                className={styles.supporterImage}
              />
            </button>
          </div>
          <p className={styles.description}>
            <span
              style={{
                marginRight: "5px",
                fontSize: "29px",
                paddingTop: "0px",
              }}
            >
              &copy;
            </span>
            <span
              style={{
                fontFamily: "nippo",
                fontWeight: 300,
                letterSpacing: "1px",
              }}
            >
              NANDITA KUMAR
            </span>{" "}
            <span
              style={{
                fontFamily: "nippo-light",
                fontWeight: 200,
                letterSpacing: "1px",
              }}
            >
              2025
            </span>
          </p>
        </div>
      </center>
    </div>
  );
};
