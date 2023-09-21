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