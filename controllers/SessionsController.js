const User = require('../models/user');
const passport = require('passport');
const viewPath = 'sessions';

exports.login = (req, res) => {
  res.render(`${viewPath}/login`, {
    pageTitle: 'Login'
  });
};

// Step 1: Create an action that will authenticate the user using Passport
exports.authenticate = (req, res, next) => {

  passport.authenticate("local", {
    successRedirect: "/items",
    successFlash: 'Logged in',
    failureRedirect: "/login",
    failureFlash: 'Invalid username or password.'
  })(req, res, next)

};

// Step 2: Log the user out
exports.delete = (req, res) => {
  req.logout();
  req.flash("primary", "You are logged out")
  res.redirect("/login")

};