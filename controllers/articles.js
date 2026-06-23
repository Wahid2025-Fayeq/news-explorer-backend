const Article = require("../models/article");

const getArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(() => {
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

const createArticle = (req, res) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    source,
    date,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "The provided article data is invalid" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

const deleteArticle = (req, res) => {
  Article.findById(req.params.articleId)
    .orFail()
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return res
          .status(403)
          .send({
            message: "You do not have permission to perform this action",
          });
      }

      return Article.findByIdAndDelete(req.params.articleId).then(() => {
        res.send({ message: "Article deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "The provided data is invalid" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(404)
          .send({ message: "The requested article could not be found" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred on the server" });
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
