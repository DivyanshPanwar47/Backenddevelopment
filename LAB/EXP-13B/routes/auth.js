const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const router = express.Router();

function tokenFor(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
}

function publicUser(user) {
  return { id: user._id, username: user.username, email: user.email };
}

router.post('/register', async (req, res) => {
  try {
    const username = String(req.body.username || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (username.length < 3 || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      return res.status(400).json({ message: 'Provide a valid username, email and password of at least 6 characters.' });
    }
    if (await User.findOne({ $or: [{ email }, { username }] })) {
      return res.status(409).json({ message: 'Email or username is already registered.' });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({ message: 'User registered successfully', token: tokenFor(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to register user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    return res.json({ message: 'Login successful', token: tokenFor(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to log in', error: error.message });
  }
});

module.exports = router;
