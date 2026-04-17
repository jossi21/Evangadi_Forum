import React from "react";
import { Link } from "react-router-dom";
import classes from "./HowItWorksModal.module.css";

const HowItWorksModal = ({ onClose }) => {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Sign up for free in seconds. No credit card required.",
      icon: "📝",
    },
    {
      id: 2,
      title: "Ask a Question",
      description:
        "Post your technical questions and get answers from experts.",
      icon: "❓",
    },
    {
      id: 3,
      title: "Get Answers",
      description: "Receive responses from our community within hours.",
      icon: "💡",
    },
    {
      id: 4,
      title: "Help Others",
      description: "Share your knowledge by answering questions from peers.",
      icon: "🤝",
    },
  ];

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes.closeBtn} onClick={onClose}>
          ×
        </button>

        <div className={classes.header}>
          <h2>How It Works</h2>
          <p>Get started in 4 simple steps</p>
        </div>

        <div className={classes.stepsGrid}>
          {steps.map((step) => (
            <div key={step.id} className={classes.stepCard}>
              <div className={classes.stepIcon}>
                <span className={classes.icon}>{step.icon}</span>
                <span className={classes.stepNumber}>{step.id}</span>
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>

        <div className={classes.cta}>
          <Link to="/register" className={classes.primaryBtn} onClick={onClose}>
            Create Free Account
          </Link>
          <Link to="/login" className={classes.secondaryBtn} onClick={onClose}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksModal;
