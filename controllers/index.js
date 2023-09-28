<<<<<<< HEAD
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
=======
// This file can serve as the main entry point for the controllers, 
// where we import and initialize all the route files. 
// It provides a clean and centralized way to set up your routes.
const router = require("express").Router()
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

router.use("/", homeRoutes)
router.use("/api", apiRoutes)

module.exports = router;
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b
