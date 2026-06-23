const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const auth = require("./middlewares/auth");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");

const app = express();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer" } =
  process.env;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "News Explorer API is running" });
});

app.use(auth);

app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);

    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
