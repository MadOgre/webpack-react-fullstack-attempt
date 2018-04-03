module.exports = app => {
  app.all("/api/*", (req, res) => res.status(404).json({
    error: "Invalid Endpoint"
  }));
};