const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const NotFoundError = require("./errors/NotFoundError");

const { createUser, login } = require("./controllers/users");

const app = express();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer" } =
  process.env;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send({ message: "News Explorer API is running" });
});

app.post("/signup", createUser);
app.post("/signin", login);

// Protected routes
app.use(auth);

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

// 404 handler
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

// Centralized error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
