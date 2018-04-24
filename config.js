module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "secret-cat",
  COOKIE_SECRET: process.env.COOKIE_SECRET || "secret-cat",
  MONGO_URL: process.env.MONGO_URL || "mongodb://localhost/webpack-react",
  MONGO_USER:process.env.MONGO_USER || "msemko@gmail.com",
  MONGO_PASS:process.env.MONGO_PASS || "1234",
  LOGIN_COOKIE_NAME: process.env.LOGIN_COOKIE_NAME || "WB_18_PUB_USER",
  TOKEN_COOKIE_NAME: process.env.TOKEN_COOKIE_NAME || "WB_18_TK",
};