// This file can contain routes and controllers related to general application functionality, 
// such as rendering the homepage or handling non-API requests.

const express = require('express');
const router = express.Router();
const { Vehicle } = require("../models")

router.get('/', (req, res) => {
  res.render('index'); // TODO: Set up a view for this
});

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
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/vehicle');
    return;
  }

  res.render('login');
});

module.exports = router;