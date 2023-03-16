var express = require('express');
var router = express.Router();

// Require Post controller module
const post_controller = require('../controllers/postController');
// Require Comment controller module
const comment_controller = require('../controllers/commentController');

// POST request for creating Post.
router.post("/post/create", post_controller.post_create);

// POST request to delete Post.
router.post("/post/:postid/delete", post_controller.post_delete);

// POST request to update Post.
router.post("/post/:postid/update", post_controller.post_update);

// GET request for one Post.
router.get("/post/:postid", post_controller.post_detail);

// GET request for list of all Post items.
router.get("/posts", post_controller.post_list);

// POST request for creating Comment for a particular Post.
router.get("/post/:postid/comment/create", comment_controller.comment_create);

// POST request to delete Comment.
router.post("/post/:postid/comment/:commentid/delete", comment_controller.comment_delete);

// POST request to update Comment.
router.post("/post/:postid/comment/:commentid/update", comment_controller.comment_update);

// GET request for one Comment. ??
router.get("/post/:postid/comment/:commentid", comment_controller.comment_detail);

// GET request for list of all Comment items.
router.get("/post/:postid/comments", comment_controller.comment_list);

module.exports = router;