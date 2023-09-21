// This file can serve as the main entry point for the controllers, 
// where we import and initialize all the route files. 
// It provides a clean and centralized way to set up your routes.

const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api/userRoutes');
const vehicleRoutes = require('./api/vehicleRoutes');

module.exports = {
  homeRoutes,
  userRoutes,
  vehicleRoutes,
};