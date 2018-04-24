const asyncMiddleware = require("../utils/async-middleware");
const jwt = require("jwt-simple");
const { JWT_SECRET, LOGIN_COOKIE_NAME, TOKEN_COOKIE_NAME } = require("../config");
const User = require("../models/User");

const verifyUser = asyncMiddleware(async (req, res, next) => {
  const pub_email = req.cookies[LOGIN_COOKIE_NAME];
  const token = req.signedCookies[TOKEN_COOKIE_NAME];
  if (!pub_email || !token) throw notAuthorized();
  const decodedToken = jwt.decode(token, JWT_SECRET);
  if (pub_email !== decodedToken.user) throw notAuthorized();
  if (!await User.findOne({email: decodedToken.user})) throw notAuthorized();
  return next();
});

const notAuthorized = () => {
  const error = new Error("User not logged in");
  error.status = 403;
  return error;
};

module.exports = {
  verifyUser
};