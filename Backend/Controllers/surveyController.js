const Survey = require('../models/Survey');

// Admin ke liye: Naya survey add karna
exports.addSurvey = async (req, res) => {
  try {
    const { title, description, category, questions, reward } = req.body;
    const newSurvey = new Survey({ title, description, category, questions, reward });
    await newSurvey.save();
    res.status(201).json({ message: "Survey created successfully!", survey: newSurvey });
  } catch (error) {
    res.status(500).json({ message: "Error creating survey", error: error.message });
  }
};

// User aur Admin ke liye: Saare surveys dekhna
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 }); // Naya sabse upar
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: "Error fetching surveys", error: error.message });
  }
};