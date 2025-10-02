const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

// implement Sign-up API Endpoint
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  // Error handling of invalid or empty data
  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all require fields",
    });
  }
  try {
    // Error handling to check for existing user to prevent duplicates
    const [user] = await dbConnection.query(
      "select username, userid FROM userTable WHERE username = ? or email=?",
      [username, email]
    );
    if (user.length > 0) {
      return res.status(StatusCodes.CONFLICT).json({
        error: "Conflict",
        message: "User already existed",
      });
    }

    // Error handling of password length
    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Password must be at least 8 characters",
      });
    }

    //Password Security or  encrypting of the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // User Registration Logic and tore the data on the database
    await dbConnection.query(
      "INSERT INTO   userTable(username, firstname, lastname, email, password) values (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
    });
    // Handling error releated to the Server
  } catch {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server error",
      message: "An unexpected error occurred",
    });
  }
}

// implement Login API Endpoint
async function login(req, res) {
  // Taking  email and password from the user
  const { email, password } = req.body;

  // Handling Error when the user try to login with empty fields
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }
  try {
    // Retrieve the username, userid and password from the userTable with it email
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM userTable WHERE email = ? ",
      [email]
    );

    // Handling Error when unauth try to login
    if (user.length == 0) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }
    // Handling Error by computing the new and an existing password of the user
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    // Session Token Generation up on successful auth
    const username = user[0].username;
    const userid = user[0].userid;

    const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(StatusCodes.OK).json({
      message: "User login successful",
      token,
      username,
    });
  } catch {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
}

// controller function of checkUser used to identify the user either authenticated or not
async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;
  return res.status(StatusCodes.OK).json({
    message: "Valid user",
    username,
    userid,
  });
}

module.exports = { register, login, checkUser };
