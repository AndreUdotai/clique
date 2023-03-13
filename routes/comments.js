var express = require('express');
var router = express.Router();

// Require Comment controller module
const comment_controller = require('../controllers/commentController');

// POST request for creating Comment.
router.post("/comment/create", comment_controller.comment_create);

// POST request to delete Comment.
router.post("/comment/:id/delete", comment_controller.comment_delete);

// POST request to update Comment.
router.post("/comment/:id/update", comment_controller.comment_update);

// GET request for one Comment.
router.get("/comment/:id", comment_controller.comment_detail);

// GET request for list of all Comment items.
router.get("/comments", comment_controller.comment_list);

module.exports = router;