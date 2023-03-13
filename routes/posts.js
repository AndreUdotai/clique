var express = require('express');
var router = express.Router();

// Require Post controller module
const post_controller = require('../controllers/postController');

// POST request for creating Post.
router.post("/post/create", post_controller.post_create);

// POST request to delete Post.
router.post("/post/:id/delete", post_controller.post_delete);

// POST request to update Post.
router.post("/post/:id/update", post_controller.post_update);

// GET request for one Post.
router.get("/post/:id", post_controller.post_detail);

// GET request for list of all Post items.
router.get("/posts", post_controller.post_list);

module.exports = router;