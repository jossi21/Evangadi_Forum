import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../Axios/axiosConfig";
import { contextData } from "../ContextData/ContextData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import classes from "./login.module.css";
import About from "../About/About";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useContext(contextData);

  // Real-time validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const error = validateEmail(value);
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const error = validatePassword(value);
    setErrors((prev) => ({ ...prev, password: error }));
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      const response = await axios.post("/user/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("token", response.data.token);

      // Update user state
      const userData = {
        username: response.data.username,
      };
      setUser(userData);

      // Save user to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/");
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={classes.section__wrapper}>
      <div className={classes.both__inner__wrapper}>
        <div className={classes.login__outer__wrapper}>
          <div className={classes.login__left__side}>
            <h3>Login to your account</h3>
            <div>
              <p>
                Don't have an account?
                <Link to="/register"> Create a new account</Link>
              </p>
            </div>
            <div className={classes.login__form}>
              <form onSubmit={handleSubmit} noValidate>
                {/* Email Input */}
                <div className={classes.inputGroup}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={handleEmailChange}
                    className={errors.email ? classes.inputError : ""}
                  />
                  {errors.email && (
                    <small className={classes.errorMessage}>
                      {errors.email}
                    </small>
                  )}
                </div>

                {/* Password Input with Show/Hide */}
                <div className={classes.passwordWrapper}>
                  <div className={classes.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={errors.password ? classes.inputError : ""}
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
                  {errors.password && (
                    <small className={classes.errorMessage}>
                      {errors.password}
                    </small>
                  )}
                </div>

                {/* Server Error */}
                {serverError && (
                  <div className={classes.serverError}>
                    <small>{serverError}</small>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    className={classes.login__Submit__button}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>

            <div>
              <Link to="/register">Create an account</Link>
            </div>
          </div>
        </div>
        <About />
      </div>
    </section>
  );
};

export default LoginForm;
