const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      min: [3, "Username should be more than 3 char"],
      max: [12, "Username can not be more than 12 char"],
      unique: true
    },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, require: true},
    password: {
      type: String,
      require: true,
      min: [6, "Password should be min 6 char"],
      max: [20, "password can not be max 12 char"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema)