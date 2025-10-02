import React, { useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import evangadi_header_logo from "../../assets/images/evangadi_header_logo.png";
import classes from "./header.module.css";

const Header = () => {
  const navRef = useRef();
  const showNavBars = () => {
    navRef.current.classList.toggle(classes.responsive__nav);
  };

  return (
    <>
      <div className={classes.header__outer__wrapper}>
        <div className={classes.left__inner__wrapper}>
          <img src={evangadi_header_logo} alt="Logo" />
        </div>
        <nav ref={navRef} className={classes.right__inner__wrapper}>
          <a href="/">Home</a>
          <a href="#">How it works</a>
          <button className={classes.header__button}>SIGN IN</button>
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
    </>
  );
};

export default Header;
