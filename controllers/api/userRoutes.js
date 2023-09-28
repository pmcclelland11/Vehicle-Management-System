<<<<<<< HEAD
const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
=======
// This file can contain routes and controllers specific to user-related actions, 
// such as user registration, login, and user-specific API endpoints.

const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const { requireAuth } = require("../../middleware/authMiddleware"); 

router.post('/signup', async (req, res) => {
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

<<<<<<< HEAD
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
=======
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

// TODO: Add more user routes (if needed)
module.exports = router;
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b
