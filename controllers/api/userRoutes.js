// This file can contain routes and controllers specific to user-related actions, 
// such as user registration, login, and user-specific API endpoints.
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { requireAuth } = require("../../middleware/authMiddleware"); 

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with a success message
      res.status(200).json({ message: 'Signup successful!' });
    });
  } catch (err) {
    // Handle signup error and respond with an error message
    console.error(err);
    res.status(400).json({ error: 'Signup failed. Please try again.' });
  }
});

// User login route
router.post('/login', requireAuth, async (req, res) => {
  try {
    // Extract user login data from the request body
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Set up the user session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    // Respond with a success message or redirect to the user's dashboard
    res.json({ message: 'Login successful!', user: req.session.user });
  } catch (error) {
    // Handle login error
    console.error(error);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// User logout route
router.post('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;