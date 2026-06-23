const User = require("../models/user");
const NotFoundError = require("../errors/NotFoundError");

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("The requested user could not be found"));
      }

      return next(err);
    });
};

module.exports = {
  getCurrentUser,
};
