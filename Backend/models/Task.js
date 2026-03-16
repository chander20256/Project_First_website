const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["instagram", "telegram", "game"],
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      default: "1 min",
    },
    link: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);