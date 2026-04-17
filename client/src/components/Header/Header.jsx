import React, { useRef, useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { contextData } from "../ContextData/ContextData";
import HowItWorksModal from "../HowItWorks/HowItWorksModal";
import evangadi_header_logo from "../../assets/images/evangadi_header_logo.png";
import classes from "./header.module.css";

const Header = () => {
  const navRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useContext(contextData);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const isLoggedIn = !!user;

  const showNavBars = () => {
    navRef.current.classList.toggle(classes.responsive__nav);
  };

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const openHowItWorks = (e) => {
    e.preventDefault();
    setShowHowItWorks(true);
  };

  return (
    <>
      <div className={classes.header__outer__wrapper}>
        <div className={classes.left__inner__wrapper}>
          <Link to="/">
            <img src={evangadi_header_logo} alt="Logo" />
          </Link>
        </div>

        <nav ref={navRef} className={classes.right__inner__wrapper}>
          <Link to="/">Home</Link>
          <a href="/how-it-works" onClick={openHowItWorks}>
            How it works
          </a>

          <button className={classes.header__button} onClick={handleAuthAction}>
            {isLoggedIn ? "SIGN OUT" : "SIGN IN"}
          </button>

          <button
            className={`${classes.nav__button} ${classes.nav__close__button}`}
            onClick={showNavBars}
          >
            <FaTimes />
          </button>
        </nav>

        <button className={classes.nav__button} onClick={showNavBars}>
          <FaBars />
        </button>
      </div>

      {/* Modal */}
      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}
    </>
  );
};

export default Header;
