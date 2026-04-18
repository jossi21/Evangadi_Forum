import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseAxios from "../../Axios/axiosConfig";
import { FaUser } from "react-icons/fa";
import classes from "./questionDetail.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const QuestionDetail = () => {
  const { question_id } = useParams();

  const [singleQuestion, setSingleQuestion] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serverResponse, setServerResponse] = useState("");
  const [eachAnswers, setEachAnswer] = useState([]);

  const answerDom = useRef();
  const token = localStorage.getItem("token");

  // GET SINGLE QUESTION
  async function oneQuestion() {
    try {
      const { data } = await baseAxios.get(`/question/${question_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSingleQuestion(data);
    } catch (error) {
      console.log(error);
    }
  }

  // GET ANSWERS
  async function questionsAnswer() {
    try {
      const { data } = await baseAxios.get(`/answer/${question_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEachAnswer(data?.answers || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    oneQuestion();
    questionsAnswer();
  }, [question_id]);

  // POST ANSWER
  async function answerHandler(e) {
    e.preventDefault();

    const answer = answerDom.current.value;

    if (!answer) {
      setError("Please enter the answer");
      return;
    }

    setLoading(true);
    setError("");
    setServerResponse("");

    try {
      const response = await baseAxios.post(
        "/answer",
        {
          answer,
          questionid: question_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setLoading(false);

      // clear input
      answerDom.current.value = "";

      // show success message immediately
      setServerResponse(response?.data?.message || "Answer posted!");
      setTimeout(() => {
        setServerResponse("");
      }, 2000);
      // refresh answers immediately
      await questionsAnswer();
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  }

  return (
    <div className={classes.outer__wrapper__qDetail}>
      {/* QUESTION */}
      <div className={classes.question__detail}>
        <h3>Question</h3>
        <h4>{singleQuestion.title}</h4>
        <p>{singleQuestion.content}</p>

        <hr />
        <h3>Answer From The Community</h3>
        <hr />
      </div>

      {/* ANSWERS */}
      <div>
        {eachAnswers.map((item, index) => (
          <div className={classes.posted__answer__wrapper} key={index}>
            <div className={classes.answer__wrapper__left__side}>
              <FaUser size={40} />
              <h5>{item.user_name}</h5>
            </div>
            <hr />
            <div>{item.content}</div>
          </div>
        ))}
      </div>

      {/* ANSWER BOX */}
      <div className={classes.answer__box__wrapper}>
        <h4>Answer The Top Question</h4>

        <Link className={classes.go__to__question} to={"/"}>
          Go to Question page
        </Link>

        <div className={classes.answer__box}>
          <form onSubmit={answerHandler}>
            {/* feedback messages */}
            {error && <div className={classes.error__text}>{error}</div>}

            {serverResponse && !error && (
              <div className={classes.posted__response}>{serverResponse}</div>
            )}

            <textarea ref={answerDom} placeholder="Your Answer..."></textarea>

            <button type="submit" disabled={loading}>
              {loading ? <ClipLoader size={15} /> : "Post Your Answer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
