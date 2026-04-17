import React from "react";
import classes from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={classes.spinner__wrapper}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Spinner;
