import React, { useState } from "react";
import classes from "./askQuestion.module.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import axios from "../../Axios/axiosConfig";

const AskQuestion = () => {
  const titleDom = useRef();
  const descriptionDom = useRef();
  const [error, setError] = useState("");

  async function postQuestionHandler(e) {
    e.preventDefault();

    const title = titleDom.current.value.trim();
    const description = descriptionDom.current.value.trim();

    console.log(title);
    console.log(description);

    if (!title || !description) {
      setError("Please provide all required fields");
      return;
    }

    // Retrieve the token from local storage

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/question",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response?.data?.msg);
    } catch (error) {
      console.log(error?.response?.data?.msg);
    }
  }

  return (
    <>
      <div className={classes.outer__wrapper__askQuestionPage}>
        <div className={classes.guide__wrapper}>
          <h4>Steps to write a good question</h4>
          <ul>
            <li>Summerize your problems in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>Review your question and post in the site.</li>
          </ul>
        </div>
        <div className={classes.question__box}>
          <div>
            <h4>Ask a public question</h4>
            <Link to={"/"} className={classes.go__to__question}>
              Go to Question page{" "}
            </Link>
          </div>
          <div>
            <form action="" onSubmit={postQuestionHandler}>
              <input ref={titleDom} type="text" placeholder="Title" />
              <textarea
                ref={descriptionDom}
                name="text"
                id="question__input"
                placeholder="Question Description..."
              ></textarea>
              {error && <div className={classes.error__text}>{error}</div>}
              <button type="submit">Post Your Question</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
