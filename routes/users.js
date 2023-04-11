import { Router } from 'express';
const router = Router();

// Require User controller module
import { user_register, friend_request, user_delete, user_update, user_detail, user_list, accept_request, reject_request} from '../controllers/userController';

// POST request for creating User.
router.post("/users", user_register);

// PUT request for sending a friend request
router.put("/users/friend-request/:userid", friend_request);

//PUT request for rejecting a friend request
router.put("/users/reject-request/:userid", reject_request)

// // PUT request for accepting a friend request
router.put("/users/accept-request/:userid", accept_request);

// DELETE request to delete User.
router.delete("/users/:userid", user_delete);

// PUT request to update User.
router.put("/users/:userid", user_update);

// GET request for one User.
router.get("/users/:userid", user_detail);

// GET request for list of all User items.
router.get("/users", user_list);

export default router;
