import React, { useState } from "react";
import HowItWorksModal from "../HowItWorks/HowItWorksModal";
import classes from "./about.module.css";

const About = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const openHowItWorks = () => {
    setShowHowItWorks(true);
  };

  return (
    <>
      <div className={classes.about__outer__side}>
        <div className={classes.about__right__side}>
          <a href="/about">About</a>
          <h2>Evangadi Networks Q&A</h2>
          <p>
            Welcome to our community-driven Q&A platform where knowledge meets
            curiosity. Ask questions, share insights, and get answers from
            experts and peers alike.
          </p>
          <p>
            Whether you're a beginner seeking guidance or an expert willing to
            share your experience, this is the perfect space to learn and grow
            together.
          </p>
          <p>
            Join thousands of active users who are making knowledge accessible
            to everyone, anytime, anywhere.
          </p>
          <button type="button" onClick={openHowItWorks}>
            HOW IT WORKS
          </button>
        </div>
      </div>

      {/* How It Works Modal */}
      {showHowItWorks && (
        <HowItWorksModal onClose={() => setShowHowItWorks(false)} />
      )}
    </>
  );
};

export default About;
