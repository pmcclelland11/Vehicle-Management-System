// This directory and file can be used to group all your API-related routes together.
// It provides a clear separation between your API routes and other routes. 

const express = require('express');
const router = express.Router();

// Import and use the user and vehicle route files
const userRoutes = require('./userRoutes');
const vehicleRoutes = require('./vehicleRoutes');

router.use('/users', userRoutes);
router.use('/vehicles', vehicleRoutes);

module.exports = router;