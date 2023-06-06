import React, { useEffect, useState } from "react";
import Image from "next/image";
import Thumbnail from "../../../../public/images/newimg.png";
import "@fontsource/roboto";
import Date from "../../../../public/images/Vector.png";

import HomeIcon from "@mui/icons-material/Home";
import styles from "../../../styles/skills/detailBlog.module.css";
import { Button } from "react-bootstrap";
import BlogForms from "../BlogForm/BlogForm";
import { useRouter } from "next/router";
export default function BlogDetails({ post }) {
  let [newdata, setNewData] = useState([])
  let [featuredPost, setFeaturedPost] = useState([])
  const router = useRouter();

  useEffect(()=>{
   fetch("https://upsc.joshtalks.org/api/v1/blogs/?recent=")
     .then((res) => res.json())
     .then((res) => {
       let k = res.results.filter((item) => item.publish_date != null);

       setNewData(k.slice(0, 3));
     });
  }, [])
  useEffect(()=>{
 fetch("https://upsc.joshtalks.org/api/v1/blogs/")
   .then((res) => res.json())
   .then((res) => {
     let k = res.results.filter(
       (item) => item.featured == true && item.publish_date != null
     );

     setFeaturedPost(k.slice(0, 3));
   });
  }, [])
  return (
    <div className={styles["headBlog"]}>
      <div className={styles["upperDiv"]}>
        <div className={styles["mainDiv"]}>
          <div className={styles["secondPara"]}>
            <h1>{post.title}</h1>
          </div>
          <div className={styles["mainBlogHome"]}>
            <div className={styles["blogHome"]}>
              <HomeIcon style={{ padding: "0px", margin: "0px" }} />
              <p className={styles["blogHomeP"]}>Blog Home</p>
            </div>
            {post.publish_date && (
              <div className={`${styles["dateStyle"]}`}>
                <div style={{ width: "fit-content", padding: "0.4%" }}>
                  <Image
                    style={{ width: "15px", height: "15px", padding: "1%" }}
                    src={Date}
                    alt="date"
                  />
                </div>

                <p
                  style={{
                    margin: "0px",

                    fontSize: "10px",
                  }}
                  className={styles["datePara"]}
                >
                  {post.publish_date}
                </p>
              </div>
            )}
          </div>
          <div className={styles["thumbnailImg"]}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              src={post.thumbnail}
              alt="thumbnail"
              width={500}
              height={500}
            />
          </div>
          <div
            className="max-w-xxl mx-auto bg-white rounded "
            id="secondElement"
          >
            <div id="firstElement"></div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="pt-3" style={{ width: "90%" }}>
                <div
                  style={{
                    fontFamily: "Roboto",
                    flexDirection: "column",
                    textAlign: "left",
                  }}
                  className={` ${styles["mainP"]} font-normal font-size-18 leading-29 flex `}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                {post.author && (
                  <h3
                    className="font-semibold  "
                    style={{
                      backgroundColor: "#025BB2",
                      width: "fit-content",
                      color: "white",
                      padding: "1%",
                    }}
                  >
                    {post.author && post.author.name}
                  </h3>
                )}
                {post.author && (
                  <div className="mt-3">
                    <Image
                      style={{ width: "164px", height: "164px" }}
                      src={Thumbnail}
                      alt="thumbnail"
                    />
                  </div>
                )}
                <p
                  style={{ fontFamily: "Roboto" }}
                  className="font-normal mt-3 font-size-18 leading-29 flex items-center "
                >
                  {post.author && post.author.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["secondDiv"]}>
          <div
            style={{
              height: "90%",
              width: "90%",
              background: "#FFFFFF",

              boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.15)",
              padding: "4%",
            }}
          >
            <h3 className={styles["secondDivH"]}>Recent Posts</h3>

            {newdata.map((item, i) => {
              return (
                <div
                  key={i}
                  style={{
                    marginTop: "30px",
                    cursor: "pointer",
                    borderBottom: "1px solid black",
                    paddingBottom: "20px",
                  }}
                  onClick={() =>
                    router.push(`/courses/english/blog/${item.slug}`)
                  }
                >
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
                </div>
              );
            })}
          </div>
          {featuredPost && featuredPost.length > 0 && (
            <div
              style={{
                height: "90%",
                width: "90%",
                background: "#FFFFFF",

                boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.15)",

                padding: "4%",
                marginTop: "50px",
              }}
            >
              <h3 className={styles["secondDivH"]}>Popular Posts</h3>

              {featuredPost.map((item, i) => {
                return (
                  <div
                    key={i}
                    style={{
                      marginTop: "30px",
                      cursor: "pointer",
                      borderBottom: "1px solid black",
                      paddingBottom: "20px",
                    }}
                    onClick={() =>
                      router.push(`/courses/english/blog/${item.slug}`)
                    }
                  >
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
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
