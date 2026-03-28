const Survey = require('../models/Survey');
const User = require('../models/User'); 
const Transaction = require('../models/Transaction'); 

// 1. Get All Surveys
exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find({ expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: "Error fetching surveys" });
  }
};

// 2. Add New Survey
exports.addSurvey = async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json({ message: "Survey created!", survey });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Delete Survey
exports.deleteSurvey = async (req, res) => {
  try {
    await Survey.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Submit Survey (Gamified Multiplier Logic)
exports.submitSurvey = async (req, res) => {
  try {
    const { userId } = req.body;
    const survey = await Survey.findById(req.params.id);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });

    const finalUserId = userId || "65f1a2b3c4d5e6f7a8b9c0d1"; 
    const user = await User.findById(finalUserId);

    // 🔥 PRO LOGIC: Random Multiplier Generation
    // 1x ke chances zyada hain, 2x (Jackpot) ke sabse kam
    const multipliers = [1, 1, 1, 1.2, 1.5, 2]; 
    const randomMultiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
    
    const baseReward = survey.reward + 10; // Normal reward
    const finalReward = Math.floor(baseReward * randomMultiplier); // Multiplied Reward
    const isJackpot = randomMultiplier >= 1.5;

    if (user) {
      user.wallet = (user.wallet || 0) + finalReward;
      await user.save();
      await Transaction.create({
        userId: finalUserId,
        type: "credit",
        amount: finalReward,
        description: `Survey Reward: ${survey.title} (x${randomMultiplier} Multiplier)`
      });
    }

    // Backend se saari detail bhej rahe hain UI animation ke liye
    res.json({ 
      message: 'Success', 
      earnedCoins: finalReward,
      baseReward: baseReward,
      multiplier: randomMultiplier,
      isJackpot: isJackpot
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};