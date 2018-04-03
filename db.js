const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost/webpack-react";
const MONGO_USER = process.env.MONGO_USER || "msemko@gmail.com";
const MONGO_PASS = process.env.MONGO_PASS || "1234";

module.exports = mongoose.connect(MONGO_URL, {user: MONGO_USER, pass: MONGO_PASS});