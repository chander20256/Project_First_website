const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =====================
// POST /api/auth/register
// =====================
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, confirm } = req.body;

    // 1. Check all fields are filled
    if (!username || !email || !password || !confirm) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check passwords match
    if (password !== confirm) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // 3. Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // 4. Hash the password (never save plain text!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create and save new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // 6. Create a JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 7. Send response back to frontend
    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        creds: newUser.creds,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// =====================
// POST /api/auth/login
// =====================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 3. Compare password with hashed one in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // 4. Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 5. Send response
    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        creds: user.creds,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;