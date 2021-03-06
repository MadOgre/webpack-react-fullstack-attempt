const express = require("express");
const app = express();
const PORT = process.env.NODE_ENV || 3000;
const path = require("path");
const bp = require("body-parser");
const cookieParser = require("cookie-parser");
const { COOKIE_SECRET } = require("./config");

app.use(bp.json());
app.use(cookieParser(COOKIE_SECRET));
require("./api")(app);

app.get("*", (req, res) => 
  res.sendFile(path.resolve(__dirname, "public", "index.html")));

app.use((err, req, res, next) => {
  if (err.name !== "ValidationError") return next(err);
  const validationErrors = {};
  Object.keys(err.errors).forEach(key => {
    validationErrors[key] = err.errors[key].message;
  });
  res.status(400).json({
    error: "Validation Error",
    validationErrors
  });
});

app.use((err, req, res, next) => 
  res.status(err.status || 500).json({error: err.message || "Unknown Error"}));

require("./db").then(() => {
  app.listen(PORT, () => console.log(`Server active on port ${PORT}`));
}).catch(err => {
  console.error("Failed to connect to database");
  console.error(err.message);
});
