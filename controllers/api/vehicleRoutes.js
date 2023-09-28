// This file can contain routes and controllers for vehicle-related actions,
// including CRUD operations and vehicle-specific API endpoints.

const express = require('express');
const router = express.Router();
const { Vehicle } = require('../../models');
const { requireAuth } = require("../../middleware/authMiddleware"); 

// Get all vehicles
router.get('/vehicles', async (req, res) => {
  try {
    // Retrieve all vehicles from the database
    const vehicles = await Vehicle.findAll();

    // Respond with the list of vehicles
    res.json(vehicles);
  } catch (error) {
    // Handle database error
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve vehicles.' });
  }
});

// Search vehicles by type
router.get('/vehicles/:type', async (req, res) => {
  try {
    const { type } = req.params;

    // Find vehicles by type in the database
    const vehicles = await Vehicle.findAll({ where: { type } });

    // Respond with the list of matching vehicles
    res.json(vehicles);
  } catch (error) {
    // Handle database error
    console.error(error);
    res.status(500).json({ error: 'Failed to search for vehicles by type.' });
  }
});

// Create a new vehicle
router.post('/vehicles', requireAuth, async (req, res) => { 
  try {
    // Extract vehicle data from the request body
    const { make, model, year, mileage, type, price, isSold } = req.body;

    // Create a new vehicle in the database
    const newVehicle = await Vehicle.create({
      make,
      model,
      year,
      mileage,
      type,
      price,
      isSold,
    });

    // Respond with the newly created vehicle
    res.json(newVehicle);
  } catch (error) {
    // Handle vehicle creation error
    console.error(error);
    res.status(500).json({ error: 'Vehicle creation failed.' });
  }
});

// TODO: Add more routes (if needed)

module.exports = router;