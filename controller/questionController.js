const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

//Implement API Endpoint for Post Question
async function postQuestion(req, res) {
  // Taking title and description from the user
  const { title, description } = req.body;
  const userid = req.user.userid;

  // Input validation
  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  const questionid = uuidv4();

  try {
    // Post the question on the questionTable in the database
    await dbConnection.query(
      "INSERT INTO questionTable (questionid, userid, title, description) VALUES (?, ?, ?, ?)",
      [questionid, userid, title, description]
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Question created successfully",
    });
  } catch (error) {
    console.error("Database error:", error); // Log the error for debugging
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// implement API endpoint for All Questions;
async function allQuestion(req, res) {
  // import username and userid from our authMiddleware
  const username = req.user.username;
  const userid = req.userid;

  // fetch the allQuestion from the database
  try {
    const [questions] = await dbConnection.query(
      "SELECT id, title, description AS content, created_at,questionid AS question_id, username FROM questionTable  JOIN usertable ON questionTable.userid = usertable.userid "
    );
    // console.log("Questions fetched:", questions);

    if (questions.length == 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "No question found",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        questions: questions.map((question) => ({
          id: question.id,
          question_id: question.question_id,
          title: question.title,
          content: question.content,
          user_name: question.username,
          created_at: question.created_at,
        })),
      });
    }
  } catch (error) {
    // log the error for debugging
    console.error("Database Error: ", error);

    // Error Handling from the server
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}
// Implement API Endpoint for Single question using it's unique id
async function singleQuestion(req, res) {
  // URL parameter
  const question_id = req.params.questionid;
  const userid = req.user.userid;

  // console.log("Request params", userid, question_id);
  // fetch the single data
  try {
    const [singleQuestion] = await dbConnection.query(
      "SELECT userid, title, id, description AS content, created_at FROM questionTable WHERE questionid = ? ",
      [question_id]
    );
    // console.log("singleQuestion: ", singleQuestion);
    if (singleQuestion.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        message: "The requested question could not be found",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        id: singleQuestion[0].id,
        title: singleQuestion[0].title,
        content: singleQuestion[0].content,
        user_id: userid,
        created_at: singleQuestion[0].created_at,
      });
    }
  } catch (error) {
    console.error("Database Error: ", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

module.exports = { postQuestion, allQuestion, singleQuestion };
