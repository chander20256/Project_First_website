const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  tempPassword: {
    type: String,
    default: null,
  },

  wallet: {
    type: Number,
    default: 0,
  },

  creds: {
    type: Number,
    default: 250,
  },

  referralCode: {
    type: String,
    unique: true,
    sparse: true,
  },

  referredByCode: {
    type: String,
    default: null,
  },

  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },

  status: {
    type: String,
    enum: ["active", "banned"],
    default: "active",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
