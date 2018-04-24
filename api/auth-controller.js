const asyncMiddleware = require("../utils/async-middleware");
const User = require("../models/User");
const jwt = require("jwt-simple");
const { JWT_SECRET, LOGIN_COOKIE_NAME, TOKEN_COOKIE_NAME } = require("../config");

const registerUser = asyncMiddleware(async (req, res) => res.json(await new User(req.body).save()));

const login = asyncMiddleware(async (req, res) => {
  if (!req.body.email || !req.body.password) throw invalidLogin();
  const user = await User.findOne({email: req.body.email});
  if (!user || !await user.verifyPassword(req.body.password)) throw invalidLogin();
  const tokenPayload = {
    user: user.email,
    loggedInDate: new Date().toString()
  };
  const token = jwt.encode(tokenPayload, JWT_SECRET);
  res.cookie(TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true
  });
  res.cookie(LOGIN_COOKIE_NAME, user.email, {
    maxAge: 1000 * 60 * 60 * 24 * 30
  });
  return res.json({result: "login success"});
});

const logout = asyncMiddleware(async (req, res) => {
  res.clearCookie("WB_18_TK");
  res.clearCookie("WB_18_PUB_USER");
  return res.json({result: "logout success"});
});

const invalidLogin = () => {
  const error = new Error("Invalid credentials");
  error.status = 403;
  return error;
};

module.exports = {
  registerUser,
  login,
  logout
};