import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/skills/blog.module.css";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import "@fontsource/roboto";
import Images from "../../../../public/images/newimg.png";
import Date from "../../../../public/images/Vector.png";
import Pagination from "../Pagination/Pagination";
import Thumbnail from "../../../../public/images/newimg.png";
function Blog({ data, pageTrack, publishData }) {


  const router = useRouter();

  const currentPage = useRef(pageTrack);
  const [currentPageState, setCurrentPageState] = useState(pageTrack); // Store currentPage in state

  useEffect(() => {
    setCurrentPageState(pageTrack ? pageTrack : 1);
    // Update state when currentPage changes
  }, [pageTrack]);
  let featuredData = data.results;



  const handlePageChange = () => {
    if (currentPage.current == 1) {
      router.push(`/courses/english`);
    } else {
      router.push(`/courses/english?page=${currentPage.current}`);
    }
  };

  function goToPage(page) {
    currentPage.current = page;
    setCurrentPageState(page);
    handlePageChange();
  }

  function nextPage() {
    currentPage.current = currentPage.current + 1;
    setCurrentPageState(currentPageState + 1);
    handlePageChange();
  }

  function prevPage() {
    currentPage.current = currentPage.current - 1;
    setCurrentPageState(currentPageState - 1);
    handlePageChange();
  }

  const pageSize = 1; // set page size to 5

  let pageCount
  if (data.results.length < 10){
pageCount = Math.floor(data.count / data.results.length);
  }else {
    pageCount = Math.ceil(data.count / data.results.length);
  }
  function lastPage() {
    currentPage.current = pageCount;
    setCurrentPageState(pageCount);
    handlePageChange();
  }
  function firstPage() {
    currentPage.current = 1;
    setCurrentPageState(1);
    handlePageChange();
  }

  // generate an array of page numbers to show in pagination controls
  let pageNumbers = [];
  if (pageCount <= 2) {
    for (let i = 1; i <= pageCount; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPageState <= 2) {
    pageNumbers = [1, 2];
  } else if (currentPageState >= pageCount - 1) {
    pageNumbers = [pageCount - 1, pageCount];
  } else {
    pageNumbers = [currentPageState, currentPageState + 1];
  }

  return (
    <div className={styles["mainTop"]}>
      {data.results.length > 0 && (
        <div className={styles["imageBox"]}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "90%",
              height: "480px",

              cursor: "pointer",
            }}
            onClick={() =>
              router.push(`/courses/english/blog/${publishData[0].slug}`)
            }
          >
            <img
              src={
                publishData[0].thumbnail ? publishData[0].thumbnail : Thumbnail
              }
              alt="thumbnail"
              width={3000}
             
              className={`${styles["imageNewStyle"]}`}
              height={3000}
              style={{
                borderRadius: "10px",
                objectFit: "cover",
                cursor: "pointer",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",

              padding: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              onClick={() =>
                router.push(`/courses/english/blog/${publishData[1].slug}`)
              }
              src={publishData[1] ? publishData[1].thumbnail : Thumbnail}
              alt="thumbnail"
              width={300}
              height={300}
              className={`${styles["imageNewStyle1"]}`}
              style={{
                width: "90%",
                flex: "1 1 0",
                marginLeft: "20px",
                marginRight: "20px",
                cursor: "pointer",

                marginBottom: "10px",
                padding: "0",
                borderRadius: "10px",
                maxHeight: `48%`,
                objectFit: "cover",
              }}
            />
            <img
              onClick={() =>
                router.push(`/courses/english/blog/${publishData[2].slug}`)
              }
              src={publishData[2] ? publishData[2].thumbnail : Thumbnail}
              alt="thumbnail"
              width={300}
              height={300}
              className={`${styles["imageNewStyle1"]}`}
              style={{
                width: "90%",
                flex: "1 1 0",
                marginLeft: "20px",
                marginRight: "20px",

                cursor: "pointer",

                padding: "0",
                borderRadius: "10px",
                maxHeight: `48%`,
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}

      {featuredData.map((item) => {
        return (
          item.is_published && (
            <div
              className={styles["imageDiv"]}
              key={item.slug}
              onClick={() => router.push(`/courses/english/blog/${item.slug}`)}
            >
              <div className={styles["imagesStyles"]}>
                <img
                  src={item.thumbnail ? item.thumbnail : Images}
                  alt={"thumbnail"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  width={500}
                  height={500}
                />
              </div>
              <div className={styles["contentDiv"]}>
                <Card.Body className={styles["CardBody"]}>
                  <h1 className={styles["category"]}>{item.category[0]}</h1>
                  <p className={styles["boxHeading"]}>{item.title}</p>
                  {item.publish_date && (
                    <div
                      className={`flex ${styles["dateDiv"]}  `}
                      style={{
                        width: "40%",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image src={Date} alt="date" />

                      <p
                        style={{
                          padding: "0px",

                          margin: "0px",
                          width: "fit-content",
                          marginLeft: "2%",
                        }}
                      >
                        {item.publish_date ? item.publish_date : ""}
                      </p>
                    </div>
                  )}
                  <p className={styles["paraP"]}>
                    {item.excerpt.slice(0, 150)}...
                  </p>
                </Card.Body>
              </div>
            </div>
          )
        );
      })}
      <div className={`${styles["pageButtonStyle"]}`}>
        <div
          style={{
            display: "flex",
            width: "fit-content",

            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              display: currentPageState > 1 ? "flex" : "none",
              height: "40px",
              backgroundColor: currentPageState === 1 ? "#eceff1" : "white",
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
              display: currentPageState > 1 ? "flex" : "none",
              height: "40px",
              backgroundColor: currentPageState === 1 ? "#eceff1" : "white",
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
            disabled={currentPageState === 1}
            onClick={prevPage}
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
                  currentPageState == pageNumber ? "#51CFFF" : "white",
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
              disabled={currentPageState === pageNumber}
            >
              {pageNumber}
            </button>
          ))}
          <button
            style={{
              backgroundColor: "white",
              display:
                currentPageState == pageCount ||
                currentPageState == pageCount - 1
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
                currentPageState === pageCount ? "#eceff1" : "white",
              display: currentPageState < pageCount ? "flex" : "none",
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
            disabled={currentPageState === pageCount}
            onClick={nextPage}
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
                currentPageState === pageCount ? "#eceff1" : "white",
              display: currentPageState < pageCount ? "flex" : "none",
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
    </div>
  );
}

export default Blog;
