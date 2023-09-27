// This file can contain routes and controllers related to general application functionality, 
// such as rendering the homepage or handling non-API requests.

const express = require('express');
const router = express.Router();
const { Vehicle } = require("../models")

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
    res.redirect('/vehicle');
    return;
  }

  res.render('login');
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

module.exports = router;