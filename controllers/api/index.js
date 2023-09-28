<<<<<<< HEAD
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
=======
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
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b
