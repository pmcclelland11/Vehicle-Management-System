// Custom middleware for requiring user authentication

const requireAuth = (req, res, next) => {
  if (req.session && req.session.user) {
    // If the user is logged in (or a user session exists), continue to the next middleware or route handler
    next();
  } else {
    // If the user is not logged in, redirect them to the login page or send an error response
    res.redirect("/login");
  }
};

module.exports = { requireAuth };


//new code 

// const requireManagerAuth = (req, res, next) => {
//   if (req.session.user && req.session.user.role === 'manager') {
//     // If the user is a manager, allow access
//     next();
//   } else {
//     // If the user is not a manager, deny access or redirect to a restricted page
//     res.status(403).json({ error: 'Access denied. You must be a manager to perform this action.' });
//   }
// };
// ​
// module.exports = { requireManagerAuth };
// ​
// module.exports = { requireAuth };