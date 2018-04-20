const { registerUser, login } = require("../api/auth-controller");

module.exports = app => {

  app.post("/api/v1/register", registerUser);
  app.post("/api/v1/login", login);

  app.all("/api/*", (req, res) => res.status(404).json({
    error: "Invalid Endpoint"
  }));
};