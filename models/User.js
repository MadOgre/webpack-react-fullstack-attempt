const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, "email is required"],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "invalid email format"]
  },
  password: {
    type: String,
    required: [true, "password is required"],
    validate: {
      validator: function(password) {
        return password.length >= 8;
      },
      message: "password is too short"
    }
  }
});

userSchema.plugin(uniqueValidator, {message: "{PATH} is already taken"});

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function() {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = mongoose.model("User", userSchema);