// This file can serve as the main entry point for the controllers, 
// where we import and initialize all the route files. 
// It provides a clean and centralized way to set up your routes.
const router = require("express").Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;