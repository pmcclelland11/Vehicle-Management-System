// This file can contain routes and controllers related to general application functionality, 
// such as rendering the homepage or handling non-API requests.
const express = require('express');
const router = express.Router();
const { Vehicle } = require("../models")
const { User } = require("../models");

// Route for the homepage
router.get('/', (req, res) => {
  // Check if the user is logged in
  const logged_in = req.session.logged_in || false;

  res.render('homepage', { layout: 'main', logged_in });
});

// Route for the login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Route for logging out
router.get('/logout', (req, res) => {
  // Clear the user session data
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    // Redirect the user to the homepage
    res.redirect('/');
  });
});

// Route for the vehicle inventory
router.get("/vehicles", async (req, res) => {
  try {
    const vehicleData = await Vehicle.findAll()

    const vehicles = vehicleData.map((vehicle) => vehicle.get({ plain: true}))
console.log(vehicles)
    res.render("vehicle", {vehicles})
  } catch(err) {
    res.status(500).json(err)
    console.log(err)
  }
});

// Route for handling user login (POST request)
router.post('/api/users/login', async (req, res) => {
  try {
    const { your_name, your_pass } = req.body;

    // Find the user by their username
    const user = await User.findOne({ where: { username: your_name } });

    if (!user) {
      // User not found, render login page with an error message
      res.render('login', { error: 'User not found' });
      return;
    }

    // Check if the password is correct (you should use a secure password hashing library)
    if (user.password !== your_pass) {
      // Incorrect password, render login page with an error message
      res.render('login', { error: 'Incorrect password' });
      return;
    }

    // Set user session as logged in
    req.session.logged_in = true;

    // Redirect to the homepage after successful login
    res.redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;