// This file can contain routes and controllers related to general application functionality,
// such as rendering the homepage or handling non-API requests.
const express = require("express");
const router = express.Router();
const { Vehicle } = require("../models");

// Route for the homepage
router.get("/", (req, res) => {
  res.render("homepage");
});

// Route for the login/signup page
router.get('/login', (req, res) => {
  // If the user has a session logged in, go to /vehicles page
  if (req.session.logged_in) {
    return res.redirect('/vehicles');
  } 
  // Otherwise, keep them on the /login page
  res.render('login');
});


// Route for the vehicle inventory page 
router.get('/vehicles', async (req, res) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect them to the login page
    return res.redirect('/login');
  }

  try {
    const vehicleData = await Vehicle.findAll();
    const vehicles = vehicleData.map((vehicle) => vehicle.get({ plain: true }));
    res.render('vehicle', { vehicles });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;