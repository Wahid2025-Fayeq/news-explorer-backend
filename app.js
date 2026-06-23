const express = require("express");

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send({ message: "News Explorer API is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
