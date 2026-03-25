const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  questions: { type: Number, required: true },
  reward: { type: Number, required: true },
  active: { type: Boolean, default: true }, // Default active rahega
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Survey', surveySchema);