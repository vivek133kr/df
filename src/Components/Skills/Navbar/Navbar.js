import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "@fontsource/sora";
import AddIcon from "@mui/icons-material/Add";
import Nav from "react-bootstrap/Nav";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import dynamic from "next/dynamic";

const DynamicNavDropdown = dynamic(
  () => import("react-bootstrap/NavDropdown"),
  { ssr: false }
);

import styles from "../../../styles/skills/navbar.module.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import Offcanvas from "react-bootstrap/Offcanvas";

import Image from "next/image";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../../public/images/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Navbarr() {
  const [expand, setExpand] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleOffcanvas = () => {
    setExpand(!expand);
  };

  return (
    <>
      <Navbar
        bg="white"
        className="mb-1"
        style={{
          width: "100%",
          backgroundColor: "#F2F2F2",
          paddingTop: "0px",
          marginTop: "0px",
        }}
      >
        <Container
          fluid
          className={styles["mobStyle"]}
          style={{ paddingRight: "4%", paddingLeft: "4%" }}
        >
          <div>
            <Image
              src={Logo}
              alt="logo"
              style={{ height: "70px", width: "70px", cursor: "pointer" }}
              onClick={() => router.push(`/courses/english`)}
            />
          </div>
          <button className={styles["hamburger"]} onClick={toggleOffcanvas}>
            <MenuIcon style={{ color: "black" }} />
          </button>
        </Container>
        <Offcanvas
          style={{ width: "100%" }}
          placement="end"
          show={windowSize.width < 1000 ? expand : false}
          onHide={() => setExpand(false)}
        >
          {" "}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                display: "flex",
                width: "90%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Image
                  src={Logo}
                  alt="logo"
                  style={{ height: "70px", width: "70px", cursor: "pointer" }}
                  onClick={() => {
                    router.push("/courses/english");
                    toggleOffcanvas();
                  }}
                />
              </div>
              <button className={styles["hamburger"]} onClick={toggleOffcanvas}>
                <CloseIcon style={{ color: "black" }} />
              </button>
            </div>
          </div>
          <Offcanvas.Body>
            <Nav className="justify-center flex-grow-1 pe-3" style={{}}>
              <Nav.Item
                className={styles.burgerDiv}
                onClick={() => {
                  router.push("/courses/english");
                  toggleOffcanvas();
                }}
              >
                <p>Home</p>
              </Nav.Item>
              <Nav.Item className={styles.burgerDiv}>
                <p>Blogs</p>
              </Nav.Item>{" "}
              <Nav.Item className={styles.burgerDiv}>
                <p>Program</p>
              </Nav.Item>
              <Nav.Item
                className={styles.burgerDiv}
                onClick={() => {
                  router.push(`/courses/english/dictionary`);
                  toggleOffcanvas();
                }}
              >
                <p>Vocabulary</p>
              </Nav.Item>{" "}
              <Nav.Item className={styles.burgerDiv}>
                <p>Grammer</p>
              </Nav.Item>
              <Nav.Item className={styles.burgerDiv}>
                <p>Courses</p>
              </Nav.Item>
              <Nav.Item className={styles.burgerDiv}>
                <p>Test your level</p>
              </Nav.Item>{" "}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
        <Container
          className={styles["webNav"]}
          style={{
            backgroundColor: "#F2F2F2",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "82px",
              backgroundColor: "#F2F2F2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  flexGrow: 0,
                  width: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: "10px",
                }}
              >
                <Image
                  src={Logo}
                  onClick={() => router.push("/courses/english")}
                  alt="logo"
                  style={{
                    height: "100%",
                    width: "80px",
                    cursor: "pointer",
                    padding: "0px",
                    margin: "0px",
                  }}
                />
              </div>
              <div
                style={{
                  flexGrow: 1,
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <Nav
                  className={`${styles["navItems"]} me-auto`}
                  style={{
                    fontFamily: "Sora",
                    position: "absolute",
                    right: "40px",

                    width: "90%",
                    display: "flex",

                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Nav.Link
                    href="/courses/english"
                    style={
                      router.pathname == "/courses/english"
                        ? {
                            paddingTop: "0px",
                            color: "#025BB2",
                            paddingBottom: "0px",
                          }
                        : {
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            color: "black",
                          }
                    }
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    href=""
                    style={
                      router.pathname.includes("/blog")
                        ? {
                            paddingTop: "0px",
                            color: "#025BB2",
                            paddingBottom: "0px",
                          }
                        : {
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            color: "black",
                          }
                    }
                  >
                    Blogs
                  </Nav.Link>
                  <Nav.Link
                    href=""
                    style={
                      router.pathname.includes("/grammer")
                        ? {
                            paddingTop: "0px",
                            color: "#DD4C76",
                            paddingBottom: "0px",
                          }
                        : {
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            color: "black",
                          }
                    }
                  >
                    Grammer
                  </Nav.Link>
                  <Nav.Item
                    style={
                      router.pathname == "/courses/english/dictionary"
                        ? {
                            paddingTop: "0px",
                            color: "#025BB2",
                            paddingBottom: "0px",
                          }
                        : {
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            color: "black",
                          }
                    }
                  >
                    <DynamicNavDropdown
                      title={
                        <span
                          style={
                            router.pathname == "/courses/english/dictionary"
                              ? {
                                  paddingTop: "0px",
                                  color: "#025BB2",
                                  paddingBottom: "0px",
                                }
                              : {
                                  paddingTop: "0px",
                                  paddingBottom: "0px",
                                  color: "black",
                                }
                          }
                        >
                          Vocabulary
                        </span>
                      }
                    >
                      <div
                        style={{
                          width: "270px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {[
                          {
                            label: "English to Hindi - Word Search",
                            url: "/courses/english/dictionary",
                          },
                        ].map((item, i) => {
                          return (
                            <Nav.Link
                              href={item.url}
                              key={i}
                              style={{
                                background: "#F2F3F5",
                                width: "95%",
                                color: "black",
                                paddingLeft: "5px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                fontFamily: "Roboto",
                                fontStyle: "normal",
                                fontWeight: 400,
                                fontSize: "18px",
                                lineHeight: "20px",
                                margin: "0px",
                                marginBottom: "0px",
                              }}
                            >
                              {item.label}
                            </Nav.Link>
                          );
                        })}
                      </div>
                    </DynamicNavDropdown>
                  </Nav.Item>
                  <Nav.Link
                    href=""
                    style={
                     {
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            color: "black",
                          }
                    }
                  >
                    Courses
                  </Nav.Link>
                  <Nav.Link
                    href=""
                    style={
                      router.pathname.includes("/test")
                        ? {
                            paddingTop: "0px",
                            color: "#DD4C76",
                            paddingBottom: "0px",
                          }
                        : {
                            paddingTop: "0px",
                            paddingBottom: "0px",
                            color: "black",
                          }
                    }
                  >
                    Test your level
                  </Nav.Link>
                </Nav>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr;
