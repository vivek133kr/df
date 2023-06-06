import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/skills/wordSearch.module.css";

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
import WordError from "./WordError";
import Cookies from "js-cookie";

function WordDetail({word}) {

    const router = useRouter();
  let [track, setTrack] = useState(false);
  let [selectedWord, setSelectedWord] = useState(word? word:"")
  let [selectedChar, setSelectedChar] = useState("");
  let [wordList, setWordList] = useState([]);

  const [value, setValue] = useState("");
  const [suggestedWords, setSuggestedWords] = useState([]);
  useEffect(() => {
    if (router.query.id && router.query.id !== selectedWord) {
      setValue("");
      setSuggestedWords([]);
      setSelectedWord(router.query.id);
    }
  }, [router.query.id]);
  useEffect(() => {
    if (value && value.length == 0) {
      setValue("");
      setSuggestedWords([]);
    }
  }, [value]);

  const callFunction = async (val) => {
    
    const response = await fetch(
      `https://upsc.joshtalks.org/api/v1/dictionary/${val}/search/`
    );
    const text = await response.text();
    const data = await JSON.parse(text);
    

    setSuggestedWords(data);
  };

  const handleChange = (e) => {
  let k = e.target.value;
  setValue(k);

    if (k.length == 0 || e.target.value.length == 0) {
      setValue("");
      setSuggestedWords([]);
    }
    if (k.length >= 1) {
      setTimeout(() => callFunction(k), 200);
    }
    // Debounce the call to callFunction by 500 milliseconds.
  };


  return (
    <div
      style={{
        width: "100%",
       
       
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className={styles["mainDiv"]}>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <TextField
              className={styles["textField"]}
              value={value}
              onChange={handleChange}
              placeholder="Type your word here"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                style: { fontSize: "18px" },
              }}
            />
            {value && value.length > 0 && (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "white",

                  position: "relative",
                }}
              >
                {suggestedWords ? (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      width: "100%", // Update width to 100%

                      display: "flex",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      border: "1px solid black",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                    }}
                  >
                    {suggestedWords.map((item, i) => {
                      return (
                        <p
                          style={{
                            backgroundColor: "#F2F3F5",
                            padding: "15px",
                            cursor: "pointer",
                            color: "black",
                            width: "92%", // Add width property to paragraphs
                            boxSizing: "border-box", // Add boxSizing property for accurate width calculation
                            margin: 5, // Remove margin to ensure proper alignment
                          }}
                          key={i}
                          onClick={() => {
                              const hyphenatedWord = item.includes(" ")
                                ? `${item.split(" ").join("-")}`
                                : item;
                              const customHyphenated = item.includes(" ");

                              // Set the customHyphenated value in the session or cookies
                              Cookies.set("customHyphenated", customHyphenated);
                              router.push(
                                `/courses/english/dictionary/english-hindi/${hyphenatedWord}/word-meaning-in-hindi`
                              );

                      
                          }}
                        >
                          {item}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <button
            className={styles["firstDivbtn"]}
            onClick={() => {
              let val = value
              setTrack(true);
               const hyphenatedWord = val.includes(" ")
                 ? `${val.split(" ").join("-")}`
                 : val; ;
               const customHyphenated = val.includes(" ");

               // Set the customHyphenated value in the session or cookies
               Cookies.set("customHyphenated", customHyphenated);
               router.push(
                 `/courses/english/dictionary/english-hindi/${hyphenatedWord}/word-meaning-in-hindi`
               );

                      

           
            }}
            style={{
              cursor: "pointer",
            }}
            variant="contained"
          >
            Search
          </button>
        </div>

        <div > 
          {word !== null ? <WordSearchMeaning word={word} />:<WordError/>}
        </div>
      </div>
    </div>
  );
}

export default WordDetail;
