import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import baseAxios from "../../Axios/axiosConfig";
import { FaCheck, FaUser } from "react-icons/fa";
import classes from "./questionDetail.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const QuestionDetail = () => {
  const { question_id } = useParams();
  const [singleQuestion, setSingleQuestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [severResponse, setServerResponse] = useState([]);
  const [eachAnswers, setEachAnswer] = useState([]);

  const nav = useNavigate();
  const token = localStorage.getItem("token");

  // console.log(question_id);
  async function oneQuestion() {
    try {
      const { data } = await baseAxios.get(`/question/${question_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(data.user_id);
      setSingleQuestion(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    oneQuestion();
  }, [question_id]);

  // posted answer handler function

  const answerDom = useRef();
  async function answerHandler(e) {
    e.preventDefault();

    const answer = answerDom.current.value;
    const token = localStorage.getItem("token");
    if (!answer) {
      setError("please enter the answer");
      return;
    }
    setLoading(true);
    try {
      const response = await baseAxios.post(
        "/answer",
        {
          answer,
          questionid: question_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      answerDom.current.value = "";
      // console.log(response);
      // alert(response?.data?.message);
      setServerResponse(response?.data?.message);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setError(error?.response?.data?.message);
    }
  }

  async function questionsAnswer() {
    try {
      const { data } = await baseAxios.get(`/answer/${question_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data.answers);
      setEachAnswer(data.answers);
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    questionsAnswer();
  }, []);

  return (
    <>
      <div className={classes.outer__wrapper__qDetail}>
        <div className={classes.question__detail}>
          <h3>Question</h3>
          <h4>{singleQuestion.title}</h4>
          <p>{singleQuestion.content}</p>
          <hr />
          <h3>Answer From The Community</h3>
          <hr />
        </div>

        <div>
          {eachAnswers?.map((itemOne, id) => {
            return (
              <div className={classes.posted__answer__wrapper} key={id}>
                <div className={classes.answer__wrapper__left__side}>
                  <div>
                    <FaUser size={40} />
                  </div>

                  <h5>{itemOne.user_name}</h5>
                </div>
                <hr />
                <div>{itemOne.content}</div>
              </div>
            );
          })}
        </div>

        <div className={classes.answer__box__wrapper}>
          <h4>Answer The Top question</h4>
          <Link className={classes.go__to__question} to={"/"}>
            Go to Question page{" "}
          </Link>

          <div className={classes.answer__box}>
            <form action="" onSubmit={answerHandler}>
              <textarea
                ref={answerDom}
                name="text"
                id="answer__input"
                placeholder="Your Answer..."
              ></textarea>
              {error ? (
                <div className={classes.error__text}>{error}</div>
              ) : (
                <div className={classes.posted__response}>{severResponse}</div>
              )}
              <button type="submit">
                {loading ? (
                  <ClipLoader size={15}></ClipLoader>
                ) : (
                  "Post Your Question"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionDetail;
