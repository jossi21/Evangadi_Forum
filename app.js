require("dotenv").config();
const express = require("express");
const app = express();
const port = 2127;

const cors = require("cors");

app.use(cors());

// import database in to our backend function
const dbConnection = require("./db/dbConfig");

// import the userRouter from the routes file
const userRouter = require("./routes/userRoute");

// import the questionRouter from the router file
const questionRouter = require("./routes/questionRoute");

// import the answerRouter
const answerRouter = require("./routes/answerRouter");

// middleware of json used to convert the response in the form of json data
app.use(express.json());

// middleware of user routes
app.use("/api/user", userRouter);

// middleware of question router
app.use("/api/question", questionRouter);

// middleware of answerRouter
app.use("/api/answer", answerRouter);

async function start() {
  try {
    const results = await dbConnection.execute("select 'test'");
    await app.listen(port);
    console.log(`The server running on port http://localhost:${port}`);
    console.log(results);
  } catch (err) {
    console.log(err.message);
  }
}

start();
