import { Router } from 'express';
const router = Router();

import passport from 'passport'

// Require Auth controller module
import { auth_login, auth_logout } from '../controllers/authController';

// POST request for user login
router.post("/login", auth_login);

// POST request for user logout
router.post("/logout", passport.authenticate('jwt', {session: false}), auth_logout);

export default router;
