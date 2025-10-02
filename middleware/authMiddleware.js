const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
  // get the token which created on login API
  const authHeader = req.headers.authorization;

  //  handling Error if the user haven't token yet
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      message: "Authentication invalid",
    });
  }
  // use bearer to more successfully
  const token = authHeader.split(" ")[1];
  //   console.log(authHeader);
  //   console.log(token);
  try {
    // Token verification
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: "Unauthorized",
      message: "Authentication invalid",
    });
  }
}

module.exports = authMiddleware;
