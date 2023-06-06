import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/skills/wordSearchMeaning.module.css";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import "@fontsource/roboto";
import "@fontsource/inter";
function WordSearchMeaning({ word }) {
  let hyphenatedWords = useRef("")
  const [isPaused, setIsPaused] = useState(false);
  const router = useRouter();
  const similarOppositeRef = useRef(null);
  let overviewOppositeRef = useRef(null);
  const [utterance, setUtterance] = useState(null);
  const [widthTotal, setWidth] = useState(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  const [text, setText] = useState("Chat");
 
  let [overviewActive, setOverviewActive] = useState(true);
  let [simword, setSimword] = useState(false);

  let handleOverviewClick = () => {
    setOverviewActive(true);
    setSimword(false);
  };
  let handleSimClick = () => {
    setOverviewActive(false);
    setSimword(true);
  };
  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(word.word);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [word.word]);
  const handlePlay = () => {
    const audio = new Audio(word.sound ? word.sound : "");
    audio.play();
  };
  const handleScrollSimClick = () => {
    similarOppositeRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleOverviewScroll = () => {
    overviewOppositeRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles["mainDiv"]} ref={overviewOppositeRef}>
      <div className={styles["firstChildDiv"]}>
        <div style={{ marginRight: "1%" }}>
          <p
            style={{
              margin: "0px",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "32px",
              lineHeight: "40px",
            }}
          >
            {word.word
              ? word.word.charAt(0).toUpperCase() + word.word.slice(1)
              : ""}
          </p>
          <p style={{ margin: "0px" }}>
            {word.pronunciation_hi ? word.pronunciation_hi : ""}
          </p>
        </div>
        <div
          style={{ marginRight: "3%", marginLeft: widthTotal < 600 && "25px" }}
        >
          <button className={styles["btnDiv"]} onClick={handlePlay}>
            <VolumeUpIcon
              style={{ color: "white", height: "30px", width: "30px" }}
            />
          </button>
        </div>
        {widthTotal > 600 && (
          <>
            <div
              className={styles["secondChildDiv"]}
              onClick={() => {
                handleOverviewClick();

                handleOverviewScroll();
              }}
              style={
                overviewActive
                  ? {
                      background: "#F2F9FF",
                      color: "#107BE5",

                      border: "3px solid #107BE5",
                    }
                  : {}
              }
            >
              <p style={{ margin: "0px" }}> Overview</p>
            </div>
            <div
              className={styles["thirdChildDiv"]}
              onClick={() => {
                handleSimClick();
                handleScrollSimClick();
              }}
              style={
                simword
                  ? {
                      background: "#F2F9FF",
                      color: "#107BE5",
                      border: "3px solid #107BE5",
                    }
                  : {}
              }
            >
              <p style={{ margin: "0px" }}>Similar and Opposite words</p>
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: "3%" }}>
        <div>
          {word.meanings &&
            Object.entries(word.meanings).map(([key, val], i) => {
              return (
                <div key={i} style={{ marginBottom: "30px" }}>
                  <p className={styles["SearchPara"]}>{key}</p>

                  <div
                    key={i}
                    className={styles["meaningPara"]}
                    style={{ fontFamily: "Roboto" }}
                  >
                    {val.map((item, j) => (
                      <div key={j}>
                        <p style={{ margin: "0px" }}>{item.meaning_en}</p>
                        {item.examples.length > 0 && (
                          <div>
                            <span
                              className={styles["SearchParaEx"]}
                              style={{ marginTop: "10px" }}
                            >
                              example :
                            </span>
                            {item.examples.slice(0, 2).map((ex, k) => (
                              <li
                                style={{ marginTop: "10px", marginLeft: "2%" }}
                                key={k}
                              >
                                {ex.example_en}
                              </li>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div ref={similarOppositeRef}>
          <div>
            {Object.keys(word.meanings).some((key) =>
              word.meanings[key].some((item) => item.similar_words.length > 0)
            ) && (
              <p
                className={styles["headPara"]}
                style={{ fontFamily: "Roboto", marginBottom: "0px" }}
              >
                Similar
              </p>
            )}
            {Object.entries(word.meanings).map(([key, items], i) => {
              const hasSimilarWords = items.some(
                (item) => item.similar_words.length > 0
              );
              return (
                hasSimilarWords && (
                  <div key={i} style={{ marginTop: "20px" }}>
                    <div>
                      <p
                        className={styles["SearchPara"]}
                        style={{ marginBottom: "0px" }}
                      >
                        {key}
                      </p>
                      <div
                        className={styles["meaningPara2nd"]}
                        style={{ fontFamily: "Roboto" }}
                      >
                        {items.map((item, j) => (
                          <p key={j}>{item.meaning_en}</p>
                        ))}
                      </div>
                    </div>
                    <div
                      style={{
                        width: widthTotal > 600 ? "60%" : "100%",
                        display: "flex",
                        flexWrap: "wrap",
                      }}
                    >
                      {items.flatMap((item) =>
                        item.similar_words.map((ite) => (
                          <div
                            key={ite.word}
                            className={styles["fourthChildDiv"]}
                            style={{
                              color: "black",
                              backgroundColor:
                                ite.has_meaning === false && "#EBECF0",
                              border: ite.has_meaning === false && "none",
                              cursor: ite.has_meaning === true && "pointer",
                              textDecoration: "none", // Add textDecoration property to remove underline
                            }}
                            onClick={() => {}}
                          >
                            <a
                              style={{
                                paddingLeft: "20px",
                                paddingRight:"20px",
                                paddingTop:"5px",
                                paddingBottom:"5px",
                                textDecoration: "none",
                              
                                width: "100%",
                                color: "black",
                              }}
                              onClick={(e) => {
                                if (ite.has_meaning) {
                                  const hyphenatedWord = ite.word.includes(" ")
                                    ? `${ite.word.split(" ").join("-")}`
                                    : ite.word;
                                  const customHyphenated =
                                    ite.word.includes(" ");

                                  // Set the customHyphenated value in the session or cookies
                                  Cookies.set(
                                    "customHyphenated",
                                    customHyphenated
                                  );

                                  hyphenatedWords.current = hyphenatedWord;
                                } else {
                                  e.preventDefault(); // Prevent the default anchor click behavior
                                }
                              }}
                              href={ite.has_meaning ? `/courses/english/dictionary/english-hindi/${
                                ite.word.toLowerCase()
                              }/word-meaning-in-hindi`:""}
                            >
                              {ite.word.charAt(0).toUpperCase() +
                                ite.word.slice(1)}
                            </a>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )
              );
            })}
          </div>

          {/* <div>
            <p
              className={styles["headOpposite"]}
              style={{ fontFamily: "Roboto" }}
            >
              Opposite
            </p>

            <div
              style={{
                width: widthTotal > 600 ? "60%" : "100%",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {[1, 2, 3].map((item) => {
                return (
                  <div key={item} className={styles["fourthChildDiv"]}>
                    <p style={{ margin: "0px" }}>{item}</p>
                  </div>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default WordSearchMeaning;
