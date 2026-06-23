const Article = require("../models/article");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("The provided article data is invalid"),
        );
      }

      return next(err);
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail()
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError(
            "You do not have permission to perform this action",
          ),
        );
      }

      return Article.findByIdAndDelete(req.params.articleId).then(() => {
        res.send({ message: "Article deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("The provided article ID is invalid"));
      }

      if (err.name === "DocumentNotFoundError") {
        return next(
          new NotFoundError("The requested article could not be found"),
        );
      }

      return next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
