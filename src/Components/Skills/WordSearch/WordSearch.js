import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/skills/wordSearch.module.css";

import TextField from "@mui/material/TextField";
import "@fontsource/inter";
import "@fontsource/roboto";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import Image from "next/image";


import GooglePlay from "../../../../public/images/GooglePlay.png";
import ImageButton from "../../../../public/images/imageButton.png";
import { useRouter } from "next/router";

import Cookies from "js-cookie";

function WordSearch() {
  let hyphenatedWords = useRef("")
  const router = useRouter()
    let selectedChar = useRef("")
    const wordslistRef= useRef(null);
     const handleScrollWordListClick = () => {
       wordslistRef.current !== null && wordslistRef.current.scrollIntoView({
         behavior: "smooth",
       });
     };
  let [track, setTrack] = useState(false);

 


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

   let [wordList, setWordList] = useState([])
 let totalPage = useRef("")
  let page= useRef(1)
  function firstPage() {
    page.current = 1
    if (selectedChar.current.length == 1) {
      handleGetData();
    }
  }
function lastPage() {

  page.current = totalPage.current;
   if (selectedChar.current.length == 1) {
     handleGetData();
   }
}


const [value, setValue] = useState("");
const [suggestedWords, setSuggestedWords] = useState([]);

useEffect(() =>{
  if (widthTotal < 600){
    
       page.current = 1;
  if (selectedChar.current.length == 1) {
    handleGetData();
  }
  }else {
    page.current = 1
      if (selectedChar.current.length == 1) {
        handleGetData();
      }
  }
}, [widthTotal])
useEffect(()=>{
  if (value && value.length == 0){
    setValue("")
    setSuggestedWords([])
  }
}, [value])

const callFunction = async (val) => {

  const response = await fetch(
    `https://upsc.joshtalks.org/api/v1/dictionary/${val}/search/`
  );
  const text = await response.text();
  const data = await JSON.parse(text);
    
  setSuggestedWords(data);
};

const handleChange = (e) => {
  let k = e.target.value
  setValue(k);

  if (k.length == 0 || e.target.value.length == 0) {
    setValue("")
    setSuggestedWords([]);
  }
  if (k.length >= 1){
 setTimeout(() => callFunction(k), 200);
  }
  // Debounce the call to callFunction by 500 milliseconds.
 
};
const handleGetData = () =>{
 let windowurl = `https://upsc.joshtalks.org/api/v1/dictionary/${selectedChar.current}/list/?page_size=30&page=${page.current}`;
 
 let moburl = `https://upsc.joshtalks.org/api/v1/dictionary/${selectedChar.current}/list/?page_size=10&page=${page.current}`;
 
 if (widthTotal > 600){
 fetch(
  windowurl
 )
   .then((res) => res.json())
   .then((res) => {
   
     setWordList([]);
     setWordList(res.results);
     totalPage.current = res.total_pages;
      handleScrollWordListClick();
   });
  }else {
     fetch(moburl)
       .then((res) => res.json())
       .then((res) => {

         setWordList([]);
         setWordList(res.results);
         totalPage.current = res.total_pages;
          handleScrollWordListClick();
       });
  }
  //  const url = `http://localhost:3005/courses/english/character/${selectedChar.current}`;
  //  window.history.pushState({}, "", url);
 
}

const handlePrev = () =>{
  if (page.current == 1){
    return;
  }
   page.current = page.current - 1;
    if (selectedChar.current.length == 1) {
      handleGetData();
    }
}
const handleNext = () =>{
 page.current = page.current + 1;
  if (selectedChar.current.length == 1) {
    handleGetData();
  }
}
const goToPage = (pagenum) =>{
  page.current = pagenum;
   if (selectedChar.current.length == 1) {
     handleGetData();
   }
} 

  let pageNumbers = [];

  if (totalPage.current <= 5) {
  
    for (let i = 1; i <= totalPage.current; i++) {
      pageNumbers.push(i);
    }
  } 
  
  
  
  else if (page.current <= 5) {
   
    pageNumbers = [1, 2, 3, 4, 5];
  }
  
  else if (page.current > 5  &&  page.current <= totalPage.current-4 ){

    pageNumbers = [page.current , page.current + 1,
      page.current + 2,
      page.current + 3,
      page.current + 4]
  }
  else if (page.current >= totalPage.current - 4) {

    pageNumbers = [
      totalPage.current - 4,
      totalPage.current - 3,
      totalPage.current - 2,
      totalPage.current - 1,
      totalPage.current,
    ];
  } 
   useEffect(() => {
    
    page.current = 1
      if (selectedChar.current.length == 1) {
        handleGetData();
      }
   }, [selectedChar.current]);

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
                           
                            setValue("");

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
            style={{ cursor: "pointer" }}
            onClick={() => {
              setTrack(true);
              let val = value;
              const hyphenatedWord = val.includes(" ")
                ? `${val.split(" ").join("-")}`
                : val;
              const customHyphenated = val.includes(" ");

              // Set the customHyphenated value in the session or cookies
              Cookies.set("customHyphenated", customHyphenated);
              router.push(
                `/courses/english/dictionary/english-hindi/${hyphenatedWord}/word-meaning-in-hindi`
              );
            }}
            variant="contained"
          >
            Search
          </button>
        </div>

        <div>
          <div className={styles["AlphabetBox"]}>
            <div className={styles["AlphabetFirstDiv"]}>
              <p
                className={styles["AlphabetP"]}
                style={{ fontFamily: "Inter" }}
              >
                Search words by alphabet
              </p>
            </div>
            <div className={styles["AlphabetSecDiv"]}>
              <div className={styles["AlphabetSecDivChild"]}>
                {[
                  "A",
                  "B",
                  "C",
                  "D",
                  "E",
                  "F",
                  "G",
                  "H",
                  "I",
                  "J",
                  "K",
                  "L",
                  "M",
                  "N",
                  "O",
                  "P",
                  "Q",
                  "R",
                  "S",
                  "T",
                  "U",
                  "V",
                  "W",
                  "X",
                  "Y",
                  "Z",
                ].map((item, i) => {
                  return (
                    <a
                      className={styles["mapP"]}
                      onClick={() => {
                        selectedChar.current = item;
                        if (selectedChar.current.length == 1) {
                          handleGetData();
                         
                        }
                      }}
                      style={{ fontFamily: "Roboto", textDecoration:"none", color:"black" }}
                      key={i}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {selectedChar.current ? (
            <div className={styles["secondmainDiv"]} ref={wordslistRef}>
              <div className={styles["mainSecondDiv"]}>
                <div className={styles["secondMainDivChild"]}>
                  <div className={styles["secondMainP"]}>
                    <h3
                      style={{
                        color: "blue",
                        width: "100%",
                      }}
                    >
                      BROWSE WORDS :
                      <span
                        style={{
                          color: "black",
                        }}
                      >
                        {" "}
                        {selectedChar.current}
                      </span>
                    </h3>
                    <div
                      className={styles["wordBox"]}
                      style={{ fontFamily: "Roboto" }}
                    >
                      {wordList &&
                        wordList.map((item) => {
                          return (
                            <a
                              style={{ cursor: "pointer", textDecoration:"none", color:"black", paddingBottom:"20px" }}
                              onClick={() => {
                                setTrack(true);
                                const hyphenatedWord = item.word.includes(" ")
                                  ? `${item.word.split(" ").join("-")}`
                                  : item.word;
                                const customHyphenated =
                                  item.word.includes(" ");

                                // Set the customHyphenated value in the session or cookies
                                Cookies.set(
                                  "customHyphenated",
                                  customHyphenated
                                );
                                hyphenatedWords.current = hyphenatedWord;
                              }}
                              key={item.word}
                              href={`/courses/english/dictionary/english-hindi/${hyphenatedWords.current}/word-meaning-in-hindi`}
                            >
                              {item.word}
                            </a>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "fit-content",

                    alignItems: "center",

                    marginTop: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    style={{
                      display: page.current > 1 ? "flex" : "none",
                      height: "40px",
                      backgroundColor: page.current === 1 ? "#eceff1" : "white",
                      border: "2px solid red",
                      color: "black",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "700",
                      margin: "5px",
                      fontSize: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid black",
                    }}
                    onClick={firstPage}
                  >
                    <p
                      style={{
                        margin: "0px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {"<<"}
                    </p>
                  </button>

                  <button
                    style={{
                      display: page.current > 1 ? "flex" : "none",
                      height: "40px",
                      backgroundColor: page.current === 1 ? "#eceff1" : "white",
                      margin: "5px",
                      color: "black",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "700",
                      border: "2px solid red",
                      fontSize: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid black",
                    }}
                    disabled={page.current === 1}
                    onClick={handlePrev}
                  >
                    <p
                      style={{
                        margin: "0px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    >
                      {"<"}
                    </p>
                  </button>

                  {/* dynamically generate page number buttons */}
                  {pageNumbers.map((pageNumber) => (
                    <button
                      style={{
                        height: "40px",
                        backgroundColor:
                          page.current == pageNumber ? "#51CFFF" : "white",
                        color: "black",
                        width: "40px",
                        margin: "5px",
                        fontFamily: "Roboto",
                        fontStyle: "normal",
                        fontWeight: "700",
                        fontSize: "16px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px solid black",
                      }}
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      disabled={page.current === pageNumber}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  <button
                    style={{
                      backgroundColor: "white",
                      display:
                        page.current == totalPage.current ||
                        page.current == totalPage.current - 1
                          ? "none"
                          : "flex",
                      height: "40px",
                      margin: "5px",
                      color: "black",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "700",

                      fontSize: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "none",
                    }}
                  >
                    <p
                      style={{
                        margin: "0px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      {"..."}
                    </p>
                  </button>

                  <button
                    style={{
                      backgroundColor:
                        page.current === totalPage.current
                          ? "#eceff1"
                          : "white",
                      display:
                        page.current < totalPage.current ? "flex" : "none",
                      height: "40px",
                      margin: "5px",
                      color: "black",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "700",

                      fontSize: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid black",
                    }}
                    disabled={page.current === totalPage.current}
                    onClick={handleNext}
                  >
                    <p
                      style={{
                        margin: "0px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      {">"}
                    </p>
                  </button>
                  <button
                    style={{
                      backgroundColor:
                        page.current === totalPage.current
                          ? "#eceff1"
                          : "white",
                      display:
                        page.current < totalPage.current ? "flex" : "none",
                      height: "40px",
                      margin: "5px",
                      color: "black",
                      fontFamily: "Roboto",
                      fontStyle: "normal",
                      fontWeight: "700",

                      fontSize: "16px",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "2px solid black",
                    }}
                    onClick={lastPage}
                  >
                    <p
                      style={{
                        margin: "0px",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      {">>"}
                    </p>
                  </button>
                </div>
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default WordSearch;
