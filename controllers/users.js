const User = require("../models/user");

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({
        email: user.email,
        name: user.name,
      });
    })

    .catch(() => {
      return res
        .status(404)
        .send({ message: "The requested user could not be found" });
    });
};

module.exports = {
  getCurrentUser,
};
