const { registerUser, login, logout } = require("../api/auth-controller");
const { verifyUser } = require("../api/checkpoint-controller.js");

module.exports = app => {

  app.post("/api/v1/register", registerUser);
  app.post("/api/v1/login", login);
  app.post("/api/v1/logout", logout);

  app.get("/secret", verifyUser, (req, res) => {
    return res.send("welcome to secret page");
  });

  app.all("/api/*", (req, res) => res.status(404).json({
    error: "Invalid Endpoint"
  }));
};