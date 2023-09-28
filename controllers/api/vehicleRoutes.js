// This file can contain routes and controllers for vehicle-related actions,
// including CRUD operations and vehicle-specific API endpoints.
const express = require('express');
const router = express.Router();
const { Vehicle } = require('../../models');
const { requireAuth, requireManagerAuth } = require("../../middleware/authMiddleware"); 
const { body, validationResult } = require("express-validator"); // New Library: express-validator

// ALL GET ROUTES: Use to filter vehicles in the database
// GET Route for /api/vehicles
router.get("/", async (req, res) => {
  try {
    // Your logic to retrieve vehicles goes here
    const vehicles = await Vehicle.findAll();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve vehicles." });
  }
});

// Search vehicles by type
router.get("/vehicles/:type", async (req, res) => {
  try {
    const { type } = req.params;

    // Find vehicles by type in the database
    const vehicles = await Vehicle.findAll({ where: { type } });

    // Respond with the list of matching vehicles
    res.json(vehicles);
  } catch (error) {
    // Handle database error
    console.error(error);
    res.status(500).json({ error: "Failed to search for vehicles by type." });
  }
});

// Other GET methods here..

// POST Route
// Create a new vehicle (Note: only accessible to managers)
router.post(
  "/",
  // requireManagerAuth,
  [
      // Define validation rules for each field in the request body
      body("make").trim().notEmpty().withMessage("Make is required"),
      body("model").trim().notEmpty().withMessage("Model is required"),
      body("year")
          .isInt({ min: 1900, max: new Date().getFullYear() })
          // .isInt method is from the express-validator library
          // "new Date().getFullYear()" returns the current year
          .withMessage("Year must be a valid year"),
      body("mileage")
          .isInt({ min: 0 })
          .withMessage("Mileage must be a positive integer"),
      body("type").trim().notEmpty().withMessage("Type is required"),
      body("price")
          .isDecimal({ decimal_digits: "2" })
          .withMessage("Price must be a valid decimal"),
      body("isSold").isBoolean().withMessage("isSold must be a boolean"),
  ],
  async (req, res) => {
      try {
          // Check for validation errors
          const errors = validationResult(req);

          if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
          }

          // Extract validated vehicle data from the request body
          const { make, model, year, mileage, type, price, isSold } = req.body;
          console.log(req.body);

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
          res.status(201).json(newVehicle);
      } catch (error) {
          // Handle vehicle creation error
          console.error(error);
          res.status(500).json({ error: "Vehicle creation failed." });
      }
  }
  
);

// PUT Route:
// Update a vehicle (Note: only accessible to managers)
router.put(
  "/vehicles/:id",
  requireManagerAuth,
  [
    // Validation rules
    body("make").trim().notEmpty().withMessage("Make is required"),
    body("model").trim().notEmpty().withMessage("Model is required"),
    body("year")
      .isInt({ min: 1900, max: new Date().getFullYear() })
      .withMessage("Year must be a valid year"),
    body("mileage")
      .isInt({ min: 0 })
      .withMessage("Mileage must be a positive integer"),
    body("type").trim().notEmpty().withMessage("Type is required"),
    body("price")
      .isDecimal({ decimal_digits: "2" })
      .withMessage("Price must be a valid decimal"),
    body("isSold").isBoolean().withMessage("isSold must be a boolean"),
  ],
  async (req, res) => {
    try {
      // Check if the user is a manager
      if (req.session.user.role !== "manager") {
        return res
          .status(403)
          .json({
            error: "Access denied. You must be a manager to update a vehicle.",
          });
      }

      // Validation and vehicle update logic...
      const { id } = req.params;
      const { make, model, year, mileage, type, price, isSold } = req.body;

      // Find the vehicle by ID
      const vehicle = await Vehicle.findByPk(id);

      if (!vehicle) {
        return res.status(404).json({ error: "Vehicle not found." });
      }

      // Update the vehicle attributes
      vehicle.make = make;
      vehicle.model = model;
      vehicle.year = year;
      vehicle.mileage = mileage;
      vehicle.type = type;
      vehicle.price = price;
      vehicle.isSold = isSold;

      // Save the updated vehicle
      await vehicle.save();

      // Respond with the updated vehicle
      res.json(vehicle);
    } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ error: "Vehicle update failed." });
    }
  }
);

// DELETE Route:
// Delete a vehicle (Note: only accessible to managers)
router.delete("/vehicles/:id", requireManagerAuth, async (req, res) => {
  try {
    // Check if the user is a manager
    if (req.session.user.role !== "manager") {
      return res
        .status(403)
        .json({
          error: "Access denied. You must be a manager to delete a vehicle!",
        });
    }

    const { id } = req.params;

    // Find the vehicle by ID
    const vehicle = await Vehicle.findByPk(id);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
    }

    // Delete the vehicle
    await vehicle.destroy();

    res.json({ message: "Vehicle deleted successfully." });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Vehicle deletion failed." });
  }
});

module.exports = router;