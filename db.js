const mongoose = require("mongoose");
const { MONGO_URL, MONGO_USER, MONGO_PASS } = require("./config");

module.exports = mongoose.connect(MONGO_URL, {user: MONGO_USER, pass: MONGO_PASS});