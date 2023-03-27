var express = require('express');
var router = express.Router();

// Require User controller module
const user_controller = require('../controllers/userController');

// POST request for creating User.
router.post("/users", user_controller.user_register);

// DELETE request to delete User.
router.delete("/users/:userid", user_controller.user_delete);

// UPDATE request to update User.
router.put("/users/:userid", user_controller.user_update);

// GET request for one User.
router.get("/users/:userid", user_controller.user_detail);

// GET request for list of all User items.
router.get("/users", user_controller.user_list);

// POST request for user login
router.get("/users/login", user_controller.user_login);

module.exports = router;
