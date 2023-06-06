import React, { useRef } from 'react'
import { Formik } from "formik";
import styles from "../../../styles/upsc/blogForm.module.css"
import * as Yup from "yup";
import { Button } from 'react-bootstrap';
function BlogForms() {
  const formRef = useRef()
  return (
    <div className={styles["headForm"]}>
      <Formik
        initialValues={{ name: "", phone: "", medium: "", state: "" }}
        onSubmit={async (values, { resetForm }) => {
       
         
          resetForm({ name: "", phone: "", medium: "", state: "" });
                    event.preventDefault();
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .matches(
              /^[a-zA-Z\s]*$/,
              "This field should not contain numbers or special characters"
            )

            .required("This is a required question"),
          phone: Yup.string()
            .matches(
              /^[0-9]{10}$/,
              "This should be a valid 10 digits phone number"
            )
            .required("This is a required question"),
          medium: Yup.string().required("This is a required question"),
          state: Yup.string().required("This is a required question"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            validateForm,
            isSubmitting,
            handleChange,
            handleBlur,
            setErrors,
            handleSubmit,
            setTouched,
            handleReset,
          } = props;
          return (
            <form
              ref={formRef}
              onSubmit={async (e) => {
                e.preventDefault();
                const isValid = await validateForm();

                if (Object.keys(isValid).length > 0) {
                  const err = Object.keys(isValid);
                
                  if (err.length) {
                   
                    const input = document.querySelector(
                      `input[name=${`${err[0]}`}]`
                    );

                    input.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                      inline: "start",
                    });
                    
                         for (let key in isValid) {
                           let newerrors = errors;

                           newerrors[key] = isValid[key];
                         }
                    
                         const touchedFields = {};
                         Object.keys(errors).forEach((fieldName) => {
                           touchedFields[fieldName] = true;
                         });
                         setTouched(touchedFields);
                  }

               
                }else{
                  handleSubmit()
                }
              }}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className={styles["formTitle"]}>
                <h2>Prepare Optional Subjects With JoshTalks UPSC</h2>
                <p className="mt-2">
                  Please request a counselling session if you need help joining
                  our courses for CSE Optional Subjects.
                </p>
              </div>
              <div className={styles["formDesign"]}>
                <div>
                  <label
                    className={`${styles["labelStyle"]} mt-4 mb-3`}
                    htmlFor="name"
                    style={{ display: "block" }}
                  >
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.name && touched.name ? "1px solid red" : "",
                    }}
                    className={` ${
                      errors.name && touched.name
                        ? "text-input error"
                        : "text-input"
                    } ${styles["inputStyle"]}`}
                  />
                  {errors.name && touched.name && (
                    <div className={styles["input-feedback"]}>
                      {errors.name}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    className={`${styles["labelStyle"]} mt-4 mb-3`}
                    htmlFor="phone"
                    style={{ display: "block" }}
                  >
                    Phone Number*
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.phone && touched.phone ? "1px solid red" : "",
                    }}
                    className={` ${
                      errors.phone && touched.phone
                        ? "text-input error"
                        : "text-input"
                    } ${styles["inputStyle"]}`}
                  />
                  {errors.phone && touched.phone && (
                    <div className={styles["input-feedback"]}>
                      {errors.phone}
                    </div>
                  )}
                </div>{" "}
                <div>
                  <label
                    className={`${styles["labelStyle"]} mt-4 mb-3`}
                    htmlFor="medium"
                    style={{ display: "block" }}
                  >
                    Medium*
                  </label>
                  <input
                    id="medium"
                    type="text"
                    name="medium"
                    value={values.medium}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.medium && touched.medium ? "1px solid red" : "",
                    }}
                    className={` ${
                      errors.medium && touched.medium
                        ? "text-input error"
                        : "text-input"
                    } ${styles["inputStyle"]}`}
                  />
                  {errors.medium && touched.medium && (
                    <div className={styles["input-feedback"]}>
                      {errors.medium}
                    </div>
                  )}
                </div>{" "}
                <div>
                  <label
                    className={`${styles["labelStyle"]} mt-4 mb-3`}
                    htmlFor="name"
                    style={{ display: "block" }}
                  >
                    State*
                  </label>
                  <input
                    id="state"
                    input="state"
                    type="text"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                      border:
                        errors.state && touched.state ? "1px solid red" : "",
                    }}
                    className={` ${
                      errors.state && touched.state
                        ? "text-input error"
                        : "text-input"
                    } ${styles["inputStyle"]}`}
                  />
                  {errors.state && touched.state && (
                    <div className={styles["input-feedback"]}>
                      {errors.state}
                    </div>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                style={{
                  background:
                    "linear-gradient(90deg, #4267B2 0%, #4267B2 100%)",
                }}
                className="mt-4 mb-4"
                disabled={isSubmitting}
              >
                Submit
              </Button>

              <p className={styles["lastP"]}>
                Our counsellor will call you back with complete details.
              </p>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default BlogForms