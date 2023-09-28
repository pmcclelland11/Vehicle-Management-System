<<<<<<< HEAD
const router = require('express').Router();
const { Project, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      projects, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
=======
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
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
<<<<<<< HEAD
    res.redirect('/profile');
=======
    res.redirect('/vehicle');
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b
    return;
  }

  res.render('login');
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> d80c149c34c5aabf1fb63b07e8de2dabbeaa559b
