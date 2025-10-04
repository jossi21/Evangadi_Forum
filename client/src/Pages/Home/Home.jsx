import React, { useContext, useEffect, useState } from "react";
import { contextData } from "../../components/ContextData/ContextData";
import classes from "./home.module.css";
import { FaUser } from "react-icons/fa";
import baseAxios from "../../Axios/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const { user, setUser } = useContext(contextData);
  // console.log(("user object: ", user));
  // console.log("user username: ", user?.username);

  const token = localStorage.getItem("token");
  const nav = useNavigate();
  async function askedQuestions() {
    try {
      const { data } = await baseAxios.get("/question", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(data?.questions);
      setQuestions(data?.questions);
    } catch (error) {
      console.log(error);
      nav("/login");
    }
  }

  useEffect(() => {
    askedQuestions();
  }, [token]);
  return (
    <>
      <div className={classes.home__outer_wrapper}>
        <div className={classes.home__inner_wrapper}>
          <div className={classes.home__user__ask}>
            <button type="button" className={classes.home__ask__button}>
              <Link to={"/askQuestion"}>Ask Question</Link>
            </button>
            <div>Welcome: {user?.username}</div>
          </div>
          <div className={classes.home__questions}>
            <h3>Questions</h3>
            {questions.map((item, id) => {
              return (
                <div>
                  <hr />
                  <div className={classes.home__question__title} key={id}>
                    <div>
                      <FaUser />
                      <h6>{item.user_name}</h6>
                    </div>

                    <div>
                      <Link className={classes.each__question__title}>
                        {item.title}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
