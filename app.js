// ==================== LOAD ENVIRONMENT VARIABLES FIRST ====================
if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: ".env.production" });
} else {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");

// ==================== ENVIRONMENT CONFIGURATION ====================
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 2127;

// ==================== CORS CONFIGURATION ====================
const allowedOrigins = isProduction
  ? [process.env.FRONTEND_URL, "https://evangadi-forum-by-jossi.netlify.app"]
  : ["http://localhost:5173", "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || !isProduction) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== DATABASE CONNECTION ====================
const dbConnection = require("./db/dbConfig");

// ==================== ROUTES ====================
const userRouter = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const answerRouter = require("./routes/answerRouter");

app.use("/api/user", userRouter);
app.use("/api/question", questionRouter);
app.use("/api/answer", answerRouter);

// ==================== HEALTH CHECK ====================
app.get("/health", async (req, res) => {
  try {
    await dbConnection.execute("SELECT 1");
    res.status(200).json({ status: "OK", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", database: "disconnected" });
  }
});

// ==================== ROOT ROUTE ====================
app.get("/", (req, res) => {
  res.json({
    name: "Evangadi Forum API",
    version: "1.0.0",
    environment: isProduction ? "production" : "development",
    port: PORT,
  });
});

// ==================== 404 HANDLER ====================
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =
    isProduction && status === 500 ? "Internal Server Error" : err.message;
  res.status(status).json({ success: false, message: message });
});

// ==================== START SERVER ====================
async function start() {
  try {
    await dbConnection.execute("SELECT 1");
    app.listen(PORT, () => {
      console.log(`Database connected successfully`);
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Environment: ${isProduction ? "PRODUCTION" : "DEVELOPMENT"}`,
      );
    });
  } catch (error) {
    console.log(`Database not connected`);
    process.exit(1);
  }
}

start();
