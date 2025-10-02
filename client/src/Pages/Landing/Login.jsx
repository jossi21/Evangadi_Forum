import React, { useRef, useState } from "react";
import classes from "./login.module.css";
import About from "../../components/About/About";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Axios/axiosConfig";
import ClipLoader from "react-spinners/ClipLoader";

// adding functionality of login__form
const Login = () => {
  const emailDom = useRef();
  const passwordDom = useRef();
  const nav = useNavigate();

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function loginHandler(e) {
    e.preventDefault();

    const email = emailDom.current.value;
    const password = passwordDom.current.value;
    // console.log(email);
    // console.log(password);

    const fields = {
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
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      setLoading(false);
      alert(response?.data?.message);
      console.log(response);
      localStorage.setItem("token", response?.data?.token);
      nav("/");
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.message);
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
  return (
    <>
      <section className={classes.section__wrapper}>
        <div className={classes.both__inner__wrapper}>
          <div className={classes.login__outer__wrapper}>
            <div className={classes.login__left__side}>
              <h3>Login to your account</h3>
              <div>
                <p>
                  Don't have an account?
                  <Link to={"/register"}>Create a new account</Link>
                </p>
              </div>
              <div className={classes.login__form}>
                <form action="" onSubmit={loginHandler}>
                  <input
                    ref={emailDom}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                  />
                  <br />
                  <input
                    ref={passwordDom}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                  />
                  <div>
                    {error && (
                      <small style={{ color: "red", textAlign: "center" }}>
                        {error}
                      </small>
                    )}
                  </div>
                  <div>
                    <button
                      className={classes.login__Submit__button}
                      type="submit"
                    >
                      {loading ? <ClipLoader size={15}></ClipLoader> : "submit"}
                    </button>
                  </div>
                </form>
              </div>

              <div>
                <Link to={"/register"}>Create an account</Link>
              </div>
            </div>
          </div>
          <About />
        </div>
      </section>
    </>
  );
};

export default Login;
