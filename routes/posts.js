var express = require('express');
var router = express.Router();

// Require Post controller module
const post_controller = require('../controllers/postController');
// Require Comment controller module
const comment_controller = require('../controllers/commentController');

// POST request for creating Post.
router.post("/posts", post_controller.post_create);

// DELETE request to delete Post.
router.delete("/posts/:postid", post_controller.post_delete);

// UPDATE request to update Post.
router.put("/posts/:postid", post_controller.post_update);

// GET request for one Post.
router.get("/posts/:postid", post_controller.post_detail);

// GET request for list of all Post items.
router.get("/posts", post_controller.post_list);

// POST request for creating Comment for a particular Post.
router.post("/posts/:postid/comments", comment_controller.comment_create);

// DELETE request to delete Comment.
router.delete("/posts/:postid/comments/:commentid", comment_controller.comment_delete);

// UPDATE request to update Comment.
router.put("/posts/:postid/comments/:commentid", comment_controller.comment_update);

// GET request for one Comment. ??
router.get("/posts/:postid/comments/:commentid", comment_controller.comment_detail);

// GET request for list of all Comment items.
router.get("/posts/:postid/comments", comment_controller.comment_list);

module.exports = router;