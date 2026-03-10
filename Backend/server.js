const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();

// ✅ Middleware - must come BEFORE routes
app.use(cors({ origin: 'http://localhost:3000' })); // your React app's URL
app.use(express.json()); // lets Express read JSON from requests

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Connect to MongoDB, then start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('❌ MongoDB error:', err));