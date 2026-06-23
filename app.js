const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/news-explorer" } =
  process.env;

app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
