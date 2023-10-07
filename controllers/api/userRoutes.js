// This file can contain routes and controllers specific to user-related actions,
// such as user registration, login, and user-specific API endpoints.
const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save user session upon successful signup
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.redirect('/vehicles');
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Signup failed. Please try again.' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by their email
    const user = await User.findOne({ where: { email } });

    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    console.log(user.password, password);
    
    // Check the password using bcrypt
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    console.log(isPasswordValid)

    // Set up the user session upon successful login
    req.session.save (()=>{
      req.session.logged_in = true;
      req.session.user_id = user.id;
      req.session.userName = user.name;
      res.status(200).json({user, message:"success"});
    })

    console.log(req.session.logged_in)

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed.' });
  }
});

// User logout route
router.post("/logout", (req, res) => {
  // if (req.session.logged_in) {
  //   req.session.destroy((err) => {
  //     if (err) {
  //       console.error("Error destroying session:", err);
  //     }
  //     //res.redirect("/");
  //     res.status(200).end()
  //   }) 
  // } else {
  //   res.status(404).end();
  // }
  req.session.destroy(()=>res.status(200).end())
  
  

})

router.get("/", (req, res) => {
  User.findAll().then(data=> res.json(data))
})


module.exports = router;
