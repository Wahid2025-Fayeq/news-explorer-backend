const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const usersRouter = require("./routes/users");
const errorHandler = require("./middlewares/error-handler");
const articlesRouter = require("./routes/articles");
const NotFoundError = require("./errors/NotFoundError");
const { createUser, login } = require("./controllers/users");
const { validateSignup, validateSignin } = require("./middlewares/validation");

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
  });

app.get("/", (req, res) => {
  res.send({ message: "News Explorer API is running" });
});
app.post("/signup", validateSignup, createUser);
app.post("/signin", validateSignin, login);

app.use(auth);

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
