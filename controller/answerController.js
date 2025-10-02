const { StatusCodes, getStatusCode } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const { response } = require("express");

// Implement API function for post answer
async function postAnswer(req, res) {
  // set up request body
  const { questionid, answer } = req.body;
  const userid = req.user.userid;
  //   console.log(id, answer);
  if (!questionid || !answer) {
    return res.status(StatusCodes).json({
      error: "Bad Request",
      message: "Please provide answer",
    });
  }
  try {
    await dbConnection.query(
      "INSERT INTO answertable(questionid,userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );
    return res.status(StatusCodes.OK).json({
      message: "Answer posted successfully",
    });
  } catch (error) {
    // log to debug
    console.error("Database Error: ", error);

    // Handling Error from the Server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// implement Api function for get answer
async function getAnswer(req, res) {
  const { questionid } = req.params;
  const username = req.user.username;
  // console.log(questionid);
  try {
    const [answers] = await dbConnection.query(
      "SELECT answerid AS answer_id, answer AS content, created_at FROM answertable WHERE questionid = ?",
      [questionid]
    );
    if (answers.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        answers: answers.map((answer) => ({
          answer_id: answer.answer_id,
          content: answer.content,
          user_name: username,
          created_at: answer.created_at,
        })),
      });
    }
  } catch (error) {
    // log to debug
    console.error("Database Error: ", error);

    // Handling Error of the Server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

module.exports = { postAnswer, getAnswer };
