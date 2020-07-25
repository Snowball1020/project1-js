const User = require('../models/user');
const viewPath = 'users';

exports.new = (req, res) => {
  res.render(`${viewPath}/new`, {
    pageTitle: 'New User'
  });
};

exports.create = async (req, res) => {
  const userDetails = req.body;
  req.session.flash = {};

  try {
    // Step 1: Create the new user and register them with Passport

    const user = new User(req.body)
    await User.register(user, req.body.password)

    res.status(200).json({ message: "Registered succsesfully" })


  } catch (error) {

    res.status(400).json({ message: "Error registering user" })

    req.session.formData = req.body;


  }
};