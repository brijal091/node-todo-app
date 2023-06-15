const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    get: (time) => time.toDateString(),
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
