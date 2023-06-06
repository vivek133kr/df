import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/skills/wordError.module.css";

import TextField from "@mui/material/TextField";
import "@fontsource/inter";
import "@fontsource/roboto";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Image from "next/image";
import WordSearchMeaning from "./WordSearchMeaning";

import GooglePlay from "../../../../public/images/GooglePlay.png";
import ImageButton from "../../../../public/images/imageButton.png";
import { useRouter } from "next/router";
import { useDebounce, useInterval } from "react-use";
import Cookies from "js-cookie";

function WordError() {
  const router = useRouter();
    let hyphenatedWords = useRef("")
  let [suggestedWords, setSuggestedWords] = useState([]);
  let [mainWord, setMainWord] = useState("");
  const { id } = router.query;

  useEffect(() => {
    let customHyphenated = Cookies.get("customHyphenated");

    let word = id;


    var originalWord;

    if (customHyphenated =="true") {
      originalWord = word.split("-").join(" ");
    } else {
      originalWord = word;
    }
   
    setMainWord(originalWord);
    fetch(
      `https://upsc.joshtalks.org/api/v1/dictionary/${originalWord}/search/`
    )
      .then((res) => res.json())
      .then((res) => {
        setSuggestedWords(res);
      });
  }, [id]);
  
  return (
    <div>
      <div className={styles["secondmainDiv"]}>
        <div className={styles["topMainFirst"]}>
          <div className={styles["mainSecondDiv"]}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: "0px",
                  fontFamily: "Inter",
                  fontStyle: "normal",
                  fontWeight: "400",
                  fontSize: "32px",
                  lineHeight: "40px",
                }}
              >
                No results found for{" "}
                <span
                  style={{
                    margin: "0px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "600",
                    fontSize: "32px",
                    lineHeight: "40px",
                  }}
                >
                  {mainWord ? mainWord : ""}
                </span>
              </p>
            </div>
          </div>
          {suggestedWords && suggestedWords.length > 0 && (
            <div style={{ marginTop: "50px", display:"flex", flexDirection:"column" }}>
              <h2
                style={{
                  marginBottom: "30px",
                  fontFamily: "Inter",
                  fontStyle: "italic",
                  fontWeight: 600,
                  fontSize: "28px",
                  lineHeight: "36px",
                  color: "#EA5230",
                }}
              >
                Did you mean :
              </h2>

              {suggestedWords.map((item, i) => {
                return (
                  <a
                    key={i}
                    style={{
                      cursor: "pointer",
                      marginBottom: "20px",
                      padding: "1.5%",
                      background: "#F2F3F5",
                      borderRadius: "3px",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: 500,
                      textDecoration: "none",

                      color: "black",
                      fontSize: "20px",
                      lineHeight: "24px",
                    }}
                    onClick={() => {

                      const hyphenatedWord = item.includes(" ")
                        ? `${item.split(" ").join("-")}`
                        : item;
                      const customHyphenated = item.includes(" ");
                      console.log(
                        hyphenatedWords.current,
                        " line 128 ",
                        hyphenatedWord
                      );
                      // Set the customHyphenated value in the session or cookies
                      Cookies.set("customHyphenated", customHyphenated);
                      hyphenatedWords.current = hyphenatedWord;
                    }}
                    href={`/courses/english/dictionary/english-hindi/${item.toLowerCase()}/word-meaning-in-hindi`}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          )}
        </div>
        <div className={styles["appCallout"]}>
          <div className={styles["appCalloutFirstDiv"]}></div>
          <div className={styles["appCalloutSecondDiv"]}>
            <div className={styles["appCalloutSecondDivChild1"]}>
              <Image
                src={ImageButton}
                alt="google-play-button"
                width={300}
                height={300}
                style={{
                  width: "52px",
                  height: "52px",
                }}
              />
              <div className={styles["appCalloutSecondDivChild2"]}>
                <p
                  style={{
                    margin: "0px",
                    fontFamily: "Roboto",
                  }}
                  className={styles["appCalloutSecondDivP1"]}
                >
                  JoshTalks English Speaking App
                </p>
                <p
                  style={{
                    margin: "0px",
                    color: "black",
                    fontFamily: "Inter",
                  }}
                  className={styles["appCalloutSecondDivP2"]}
                >
                  {" "}
                  <span
                    style={{
                      color: "#025BB2",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: 600,
                      fontSize: "24px",
                    }}
                  >
                    5 million+
                  </span>{" "}
                  App Users
                </p>
              </div>
            </div>
            <div className={styles["appCalloutbtn"]}>
              <Image
                src={GooglePlay}
                alt="google-play"
                width={200}
                height={300}
                onClick={() => {
                  let url =
                    "https://play.google.com/store/apps/details?id=com.joshtalks.joshskills&hl=en&_branch_match_id=1132591104548994798&utm_source=Youtube&utm_medium=marketing&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXz8ovzijOzszJKdZLLCjQy8nMy9ZPKo3yzjWzcMxOTAIArfufyycAAAA%3D";

                  const win = window.open(url, "_blank");
                  win.focus();
                }}
                style={{
                  margin: "0px",
                  padding: "0px",
                  height: "60px",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WordError;
