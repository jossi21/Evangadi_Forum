import React from "react";
import classes from "./about.module.css";
const About = () => {
  return (
    <>
      <div className={classes.about__outer__side}>
        <div className={classes.about__right__side}>
          <a href="">About</a>
          <h2>Evangadi Networks Q&A</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. In at
            quaerat officia aperiam odit temporibus nulla molestiae sit natus!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaqueodit,
            quod ipsa repudiandae excepturi sed necessitatibus officiis est.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem itaque amet doloremque?
          </p>
          <button type="button">HOW IT WORKS</button>
        </div>
      </div>
    </>
  );
};

export default About;
