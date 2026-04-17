import React, { useRef, useState } from "react";
import classes from "../Auth/register.module.css";
import About from "../About/About";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Axios/axiosConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const emailDom = useRef(null);
  const firstNameDom = useRef(null);
  const lastNameDom = useRef(null);
  const userNameDom = useRef(null);
  const passwordDom = useRef(null);

  const nav = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();

    const email = emailDom.current.value;
    const firstname = firstNameDom.current.value;
    const lastname = lastNameDom.current.value;
    const username = userNameDom.current.value;
    const password = passwordDom.current.value;

    const fields = {
      username: userNameDom,
      firstname: firstNameDom,
      lastname: lastNameDom,
      email: emailDom,
      password: passwordDom,
    };

    const isThatValid = validationChecker(fields);

    if (!isThatValid.isValid) {
      setError(isThatValid.errorMessage);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("/user/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      setLoading(false);
      alert(response?.data?.message);
      nav("/login");
    } catch (error) {
      setLoading(false);
      console.log(error.response?.data?.message);
      setError(error?.response?.data?.message);
    }
  }

  function validationChecker(fields) {
    let isValid = true;
    let errorMessage = "";

    for (const [key, dom] of Object.entries(fields)) {
      const isFieldValid = dom.current.value;
      dom.current.style.border = isFieldValid ? "" : "solid 1px red";
      if (!isFieldValid) {
        isValid = false;
        errorMessage = "Please provide all required fields";
      }
    }
    return { isValid, errorMessage };
  }

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className={classes.section__wrapper}>
        <div className={classes.both__inner__wrapper}>
          <div className={classes.register__outer__wrapper}>
            <div className={classes.register__left__side}>
              <h3>Join the network</h3>
              <div>
                <p>
                  Already have an account?<Link to={"/login"}>Sign in</Link>
                </p>
              </div>
              <div className={classes.register__form}>
                <form onSubmit={submitHandler}>
                  <input
                    ref={userNameDom}
                    type="text"
                    name="user_name"
                    id="user_name"
                    placeholder="User Name"
                  />
                  <div>
                    <input
                      ref={firstNameDom}
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="First Name"
                    />
                    <input
                      ref={lastNameDom}
                      type="text"
                      name="last_name"
                      id="last_name"
                      placeholder="Last Name"
                    />
                  </div>
                  <input
                    ref={emailDom}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />

                  {/* Password field with toggle */}
                  <div className={classes.passwordContainer}>
                    <input
                      ref={passwordDom}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className={classes.passwordToggle}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>

                  {error && (
                    <div style={{ textAlign: "center" }}>
                      <small
                        style={{
                          color: "red",
                        }}
                      >
                        {error}
                      </small>
                    </div>
                  )}

                  <div>
                    <button
                      className={classes.register__button}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? <ClipLoader size={15} /> : "Agree and Join"}
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <p className={classes.register__policy}>
                  I agree to the <Link to={"/login"}>privacy policy</Link> and
                  <a href="">term of service</a>
                </p>
                <Link to={"/login"}>Already have an account</Link>
              </div>
            </div>
          </div>
          <About />
        </div>
      </section>
    </>
  );
};

export default Register;
