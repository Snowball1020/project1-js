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

  passport.authenticate("local", (err, user) => {

    if (err || !user) return res.status(401).json({
      status: "Failed",
      message: "Not Authorized",
      error: err
    })

    req.login(user, err => {
      if (err) return res.status(401).json({
        status: "Failed",
        message: "Not Authorized",
        error: err
      })

      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email
        }
      })

    })

  })(req, res, next);

};

// Step 2: Log the user out
exports.delete = (req, res) => {
  req.logout();
  req.flash("primary", "You are logged out")
  res.redirect("/login")

};