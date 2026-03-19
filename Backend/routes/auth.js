const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const Referral = require('../models/Referral');
const { protectRoute } = require('../middleware/authMiddleware');

const generateReferralCode = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

// ─── Helper: generate JWT token ──────────────────────────
const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ════════════════════════════════════════════════════════
// @route   POST /api/auth/register
// @desc    Register a new user
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

    // ── Check duplicates ────────────────────────────────
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({ message: 'This email is already registered' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: 'This username is already taken' });
    }

    let referredBy = null;
    let referredByCode = null;
    if (referral && referral.trim()) {
      const referralCodeInput = referral.trim().toUpperCase();
      const referrer = await User.findOne({ referralCode: referralCodeInput });
      if (!referrer) {
        return res.status(400).json({ message: 'Invalid referral code' });
      }
      referredBy = referrer._id;
      referredByCode = referralCodeInput;
    }

    // ── Hash password ───────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Create user in MongoDB ──────────────────────────
    let referralCode = generateReferralCode();
    while (await User.findOne({ referralCode })) {
      referralCode = generateReferralCode();
    }

    const newUser = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      referralCode,
      referredBy,
      referredByCode,
    });
    await newUser.save();

    if (referredBy) {
      await Referral.create({
        referrer: referredBy,
        referredUser: newUser._id,
        status: 'Active',
        earnings: 50,
      });
    }

    // ── Generate token ──────────────────────────────────
    const token = generateToken(newUser._id, newUser.email);

    // ── Send response ───────────────────────────────────
    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        creds: newUser.creds,
        referralCode: newUser.referralCode,
        referredBy: newUser.referredBy,
        referredByCode: newUser.referredByCode,
        createdAt: newUser.createdAt,
      },
    });

  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});


// ════════════════════════════════════════════════════════
// @route   POST /api/auth/login
// @desc    Login existing user
// @access  Public
// ════════════════════════════════════════════════════════
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ── Validation ──────────────────────────────────────
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ── Find user ───────────────────────────────────────
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ── Check password ──────────────────────────────────
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // ── Generate token ──────────────────────────────────
    const token = generateToken(user._id, user.email);

    // ── Send response ───────────────────────────────────
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        creds: user.creds,
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
// @desc    Get current logged-in user profile
// @access  Private (needs token)
// ════════════════════════════════════════════════════════
router.get('/me', protectRoute, async (req, res) => {
  try {
    // req.user is set by protectRoute middleware
    res.status(200).json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        creds: req.user.creds,
        createdAt: req.user.createdAt,
      }
    });
  } catch (err) {
    console.error('Get me error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});


// ════════════════════════════════════════════════════════
// @route   PUT /api/auth/update-creds
// @desc    Add or subtract creds from user
// @access  Private (needs token)
// ════════════════════════════════════════════════════════
router.put('/update-creds', protectRoute, async (req, res) => {
  try {
    const { amount } = req.body; // positive = add, negative = subtract

    if (amount === undefined || isNaN(amount)) {
      return res.status(400).json({ message: 'Amount is required and must be a number' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { creds: amount } }, // $inc adds or subtracts
      { new: true, select: '-password' } // return updated doc, exclude password
    );

    res.status(200).json({
      message: `Creds updated! New balance: ${updatedUser.creds}`,
      creds: updatedUser.creds,
    });

  } catch (err) {
    console.error('Update creds error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});


// ════════════════════════════════════════════════════════
// @route   PUT /api/auth/update-profile
// @desc    Update username or email
// @access  Private (needs token)
// ════════════════════════════════════════════════════════
router.put('/update-profile', protectRoute, async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if new username is taken by someone else
    if (username) {
      const taken = await User.findOne({ username, _id: { $ne: req.user._id } });
      if (taken) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }

    // Check if new email is taken by someone else
    if (email) {
      const taken = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.user._id } });
      if (taken) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...(username && { username }), ...(email && { email }) },
      { new: true, select: '-password' }
    );

    res.status(200).json({
      message: 'Profile updated!',
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        creds: updatedUser.creds,
      }
    });

  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ message: 'Server error.' });
  }
});


// ════════════════════════════════════════════════════════
// @route   DELETE /api/auth/delete-account
// @desc    Delete logged-in user's account
// @access  Private (needs token)
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