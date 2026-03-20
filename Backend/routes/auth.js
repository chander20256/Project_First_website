// routes/auth.js
const express  = require('express');
const router   = express.Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const crypto   = require('crypto');
const User     = require('../models/User');
const Referral = require('../models/Referral');
const { protectRoute } = require('../middleware/authMiddleware');

// ── Helper: auto-generate referral code (e.g. "A1B2C3") ──
const generateReferralCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

// ── Helper: sign JWT ───────────────────────────────────
const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ════════════════════════════════════════════════════════
// @route   POST /api/auth/register
// @desc    Register new user — auto-generates referral code
// @access  Public
// ════════════════════════════════════════════════════════
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirm, referral } = req.body;

    // ── Validation ──────────────────────────────────────
    if (!username || !email || !password || !confirm) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirm) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }

    // ── Duplicate check ─────────────────────────────────
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ message: 'This email is already registered' });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'This username is already taken' });
    }

    // ── Referral code check ─────────────────────────────
    let referredBy     = null;
    let referredByCode = null;
    if (referral && referral.trim()) {
      const referralCodeInput = referral.trim().toUpperCase();
      const referrer = await User.findOne({ referralCode: referralCodeInput });
      if (!referrer) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }
      referredBy     = referrer._id;
      referredByCode = referralCodeInput;
    }

    // ── Hash password ───────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Auto-generate unique referral code ──────────────
    // Format: 6 char hex string e.g. "A1B2C3"
    let referralCode = generateReferralCode();
    while (await User.findOne({ referralCode })) {
      referralCode = generateReferralCode(); // retry if collision
    }

    // ── Create user ─────────────────────────────────────
    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      referralCode,   // ✅ auto-generated code saved to user
      referredBy,
      referredByCode,
    });
    await newUser.save();

    // ── If referred — create record + award tokens ──────
    if (referredBy) {
      const BASE_REWARD = 50;

      const referralCount = await Referral.countDocuments({ referrer: referredBy });
      const newCount      = referralCount + 1;

      // Milestone bonuses (matches frontend MILESTONES)
      const MILESTONES = [
        { refs: 1,  bonus: 50   },
        { refs: 5,  bonus: 300  },
        { refs: 15, bonus: 1000 },
        { refs: 50, bonus: 5000 },
      ];
      const hitMilestone = MILESTONES.find((m) => m.refs === newCount);
      const bonusAmount  = hitMilestone ? hitMilestone.bonus : 0;
      const totalReward  = BASE_REWARD + bonusAmount;

      await Referral.create({
        referrer:     referredBy,
        referredUser: newUser._id,
        status:       'Active',
        earnings:     totalReward,
      });

      // Add tokens to referrer
      await User.findByIdAndUpdate(referredBy, {
        $inc: { creds: totalReward },
      });
    }

    const token = generateToken(newUser._id, newUser.email);

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id:             newUser._id,
        username:       newUser.username,
        email:          newUser.email,
        creds:          newUser.creds,
        referralCode:   newUser.referralCode, // ✅ returned on register
        referredBy:     newUser.referredBy,
        referredByCode: newUser.referredByCode,
        createdAt:      newUser.createdAt,
      },
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ════════════════════════════════════════════════════════
// @route   POST /api/auth/login
// @access  Public
// ════════════════════════════════════════════════════════
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.email);

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id:        user._id,
        username:  user.username,
        email:     user.email,
        creds:     user.creds,
        createdAt: user.createdAt,
      },
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ════════════════════════════════════════════════════════
// @route   GET /api/auth/me
// @desc    Get current user — includes referralCode
// @access  Private
// ════════════════════════════════════════════════════════
router.get('/me', protectRoute, async (req, res) => {
  try {
    // ✅ referralCode returned at top level — frontend reads res.data.referralCode
    res.status(200).json({
      id:           req.user._id,
      username:     req.user.username,
      email:        req.user.email,
      creds:        req.user.creds,
      referralCode: req.user.referralCode, // ✅ this is what ReferralLinkCard.jsx uses
      createdAt:    req.user.createdAt,
    });
  } catch (err) {
    console.error('Get me error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ════════════════════════════════════════════════════════
// @route   POST /api/auth/generate-referral-code
// @desc    One-time fix for existing users with no referral code
// @access  Private
// ════════════════════════════════════════════════════════
router.post('/generate-referral-code', protectRoute, async (req, res) => {
  try {
    // If user already has a code — just return it
    if (req.user.referralCode) {
      return res.json({ referralCode: req.user.referralCode });
    }

    // Generate a new unique code
    let referralCode = generateReferralCode();
    while (await User.findOne({ referralCode })) {
      referralCode = generateReferralCode();
    }

    await User.findByIdAndUpdate(req.user._id, { referralCode });

    res.json({
      message:      'Referral code generated!',
      referralCode,
    });
  } catch (err) {
    console.error('Generate code error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ════════════════════════════════════════════════════════
// @route   PUT /api/auth/update-creds
// @access  Private
// ════════════════════════════════════════════════════════
router.put('/update-creds', protectRoute, async (req, res) => {
  try {
    const { amount } = req.body;

    if (amount === undefined || isNaN(amount)) {
      return res.status(400).json({ message: 'Amount is required and must be a number' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { creds: amount } },
      { new: true, select: '-password' }
    );

    res.status(200).json({
      message: `Creds updated! New balance: ${updatedUser.creds}`,
      creds:   updatedUser.creds,
    });

  } catch (err) {
    console.error('Update creds error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ════════════════════════════════════════════════════════
// @route   PUT /api/auth/update-profile
// @access  Private
// ════════════════════════════════════════════════════════
router.put('/update-profile', protectRoute, async (req, res) => {
  try {
    const { username, email } = req.body;

    if (username) {
      const taken = await User.findOne({ username, _id: { $ne: req.user._id } });
      if (taken) return res.status(400).json({ message: 'Username already taken' });
    }
    if (email) {
      const taken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user._id } });
      if (taken) return res.status(400).json({ message: 'Email already in use' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...(username && { username }), ...(email && { email }) },
      { new: true, select: '-password' }
    );

    res.status(200).json({
      message: 'Profile updated!',
      user: {
        id:       updatedUser._id,
        username: updatedUser.username,
        email:    updatedUser.email,
        creds:    updatedUser.creds,
      },
    });

  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// ════════════════════════════════════════════════════════
// @route   DELETE /api/auth/delete-account
// @access  Private
// ════════════════════════════════════════════════════════
router.delete('/delete-account', protectRoute, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (err) {
    console.error('Delete account error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;