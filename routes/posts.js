import { Router } from 'express';
var router = Router();

// Require Post controller module
import { post_create, post_delete, post_update, post_detail, post_list } from '../controllers/postController';
// Require Comment controller module
import { comment_create, comment_delete, comment_update, comment_detail, comment_list } from '../controllers/commentController';

// POST request for creating Post.
router.post("/posts", post_create);

// DELETE request to delete Post.
router.delete("/posts/:postid", post_delete);

// UPDATE request to update Post.
router.put("/posts/:postid", post_update);

// GET request for one Post.
router.get("/posts/:postid", post_detail);

// GET request for list of all Post items.
router.get("/posts", post_list);

// POST request for creating Comment for a particular Post.
router.post("/posts/:postid/comments", comment_create);

// DELETE request to delete Comment.
router.delete("/posts/:postid/comments/:commentid", comment_delete);

// UPDATE request to update Comment.
router.put("/posts/:postid/comments/:commentid", comment_update);

// GET request for one Comment. ??
router.get("/posts/:postid/comments/:commentid", comment_detail);

// GET request for list of all Comment items.
router.get("/posts/:postid/comments", comment_list);

export default router;