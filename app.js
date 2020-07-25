//console.clear();
/*
  Step 1: Create a new express app
*/

const express = require("express")
const app = express();
require("dotenv").config();

/*
  Step 2: Setup Mongoose (using environment variables)
*/

const mongoose = require("mongoose")

mongoose.connect(process.env.DB_URI, {
  auth: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(console.log("MongoDB connected!"))
  .catch(err => console.log(err))


/*
  Step 3: Setup and configure Passport
*/
const passport = require("passport")

const session = require('express-session');
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())
const User = require("./models/user")
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


/*


JWT was here


*/



/*
  Step 4: Setup the asset pipeline, path, the static paths,
  the views directory, and the view engine
*/
const path = require('path');

// Set our views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static('assets/css'));
app.use('/javascript', express.static('assets/javascript'));
app.use('/images', express.static('assets/images'));

/*
  Step 5: Setup the body parser
*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

/*
  Step 6: Setup our flash helper, default locals, and local helpers (like formData and authorized)
*/

const flash = require('connect-flash');
app.use(flash());

app.use('/', (req, res, next) => {

  // Passing along flash message
  res.locals.flash = req.flash();

  res.locals.formData = req.session.formData || {};
  req.session.formData = {};
  res.locals.authorized = req.isAuthenticated();

  next();
});

/*
  Step 7: Register our route composer
*/

const routes = require('./routes.js');
app.use('/api', routes);

/*
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Hello World" })
})
*/


/*following is for Heroku development only */

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
})






/* this is for development version
const clientRoot = path.join(__dirname, "/client/build")
app.use((req, res, next) => {
  if (req.method === "GET" && req.accepts("html") && !req.is("json") && !req.path.includes(".")) {
    res.sendFile("index.html", { clientRoot })
  } else next()
})
*/


/*
  Step 8: Start the server
*/

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));