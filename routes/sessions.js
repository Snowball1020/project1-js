const { login, authenticate, delete: _delete } = require('../controllers/SessionsController');

module.exports = router => {
  // Step 1: Setup the necessary routes for login, authenticate, and logout
  router.get('/login', login);
  router.post("/authenticate", authenticate)
  router.get("/logout", _delete)

};