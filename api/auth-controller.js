const asyncMiddleware = require("../utils/async-middleware");
const User = require("../models/User");

const registerUser = asyncMiddleware(async (req, res) => res.json(await new User(req.body).save()));
const login = asyncMiddleware(async (req, res) => {
  if (!req.body.email || !req.body.password) throw invalidLogin();
  const user = await User.findOne({email: req.body.email});
  if (!user || !await user.verifyPassword(req.body.password)) throw invalidLogin();
  return res.json({result: "login success"});
});

const invalidLogin = () => {
  const error = new Error("Invalid credentials");
  error.status = 403;
  return error;
};

module.exports = {
  registerUser,
  login
};