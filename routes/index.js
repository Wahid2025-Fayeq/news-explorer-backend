const router = require("express").Router();

const usersRouter = require("./users");
const articlesRouter = require("./articles");
const { createUser, login } = require("../controllers/users");
const { validateSignup, validateSignin } = require("../middlewares/validation");
const auth = require("../middlewares/auth");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use("/users", auth, usersRouter);
router.use("/articles", auth, articlesRouter);

module.exports = router;
