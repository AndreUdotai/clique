var express = require('express');
var router = express.Router();

// Require User controller module
const user_controller = require('../controllers/userController');

// POST request for creating User.
router.post("/user/create", user_controller.user_register);

// POST request to delete User.
router.post("/user/:id/delete", user_controller.user_delete);

// POST request to update User.
router.post("/user/:id/update", user_controller.user_update);

// GET request for one User.
router.get("/user/:id", user_controller.user_detail);

// GET request for list of all User items.
router.get("/users", user_controller.user_list);

module.exports = router;
