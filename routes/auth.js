var express = require('express');
var router = express.Router();

// Require Auth controller module
const auth_controller = require('../controllers/authController');

// POST request for user login
router.post("/login", auth_controller.auth_login);

module.exports = router;