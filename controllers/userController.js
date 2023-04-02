import User from '../models/User';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import async from 'async';

// Display list of all Users.
exports.user_list = async (req, res) => {
    try {
        let users = await User.find().exec();
        res.status(200).json({
            data: users,
            user: req.user,
        });
    } catch (err) {
        return next(err);
    }
};

// Display detail page for a specific User.
exports.user_detail = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.userid).populate(
            'friendRequests',
        );

        if (user == null) {
            // No results.
            const err = new Error('User not found!');
            err.status = 404;
            return next(err);
        }

        // Successful
        res.status(200).json({
            message: 'User details',
            user,
        });
    } catch (err) {
        return next(err);
    }
};

// Handle User register.
exports.user_register = [
    // validate and sanitize fields.
    body('name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Name must be specified'),
    body('username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username must be specified'),
    body('email')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Email must be specified'),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('confirmPassword')
        .isLength({ min: 1 })
        .withMessage('Confirm password!')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match!'),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a User object with trimmed data.
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        if (!errors.isEmpty()) {
            // There are errors.
            res.status(400).json({
                user: user,
                errors: errors,
            });
            return;
        } else {
            // Data from form is valid.
            // Check if a User with the same username already exists.
            try {
                let found_username = await User.findOne({
                    username: user.username,
                }).exec();

                if (found_username) {
                    // User with same username already exist, Render form again with sanitized values/errors messages.
                    res.status(400).json({
                        user: user,
                        usernameError: 'Username already exists!',
                    });
                    return;
                }

                bcrypt.hash(user.password, 10, async (err, hashedPassword) => {
                    if (err) {
                        return next(err);
                    }
                    user.password = hashedPassword;

                    try {
                        await user.save();
                        res.status(200).json({
                            message: 'User created successfully',
                            user: user,
                        });
                    } catch (err) {
                        return next(err);
                    }
                });
            } catch (err) {
                return next(err);
            }
        }
    },
];

// Handle User delete.
exports.user_delete = (req, res) => {
    res.send('NOT IMPLEMENTED: User delete');
};

// Handle User update.
exports.user_update = (req, res) => {
    res.send('NOT IMPLEMENTED: User update POST');
};

// Handle User friend request.
exports.friend_request = async (req, res, next) => {
    try {
        // Check if a user is trying to send a friend request to itself
        if (req.user._id == req.params.userid) {
            return res.json({
                message: 'You cannot send a friend request to yourself!',
            });
        }
        // Check if they are already friends
        let requestedUser = await User.findById(req.params.userid);
        if(requestedUser.friends.includes(req.user._id)){
            return res.json({
                message: "You are already friends with this user!",
            })
        }
        // Check if the friend request was already sent
        if (requestedUser.friendRequests.includes(req.user._id)) {
            return res.json({
                message: 'A friend request was already sent to this user!',
            });
        } else {
            let user = await User.findByIdAndUpdate(
                req.params.userid,
                { $push: { friendRequests: req.user._id } },
                { new: true },
            ).exec();
            res.status(200).json({
                message: 'Friend request successfully sent!',
                user: user,
            });
        }
    } catch (err) {
        return next(err);
    }
};

// Handle User friend request rejection.
exports.reject_request = async (req, res) => {
    try {
        // Grab the requesting id from the parameters
        let reqId = req.params.userid;
        // Check if the request id exists in the friend request array
        let user = await User.findById(req.user._id).exec();
        let friendRequestsArray = user.friendRequests;
        // Loop over the friendRequests Array
        for (let request of friendRequestsArray) {
            if (String(request._id) === reqId) {
                // There is a valid friend request
                // Find the index of request
                let requestIndex = friendRequestsArray.indexOf(request);
                // Remove the request from the friendRequestArray
                friendRequestsArray.splice(requestIndex, 1);

                await User.findByIdAndUpdate(user._id, {
                    friendRequests: friendRequestsArray,
                });

                return res.status(200).json({
                    message: 'Successfully declined friend request',
                    user,
                });
            } else {
                // There is no valid friend request
                return res.json({
                    message: 'User did not send friend request!',
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};

exports.accept_request = async (req, res, next) => {
    // Check if they are already friends
    try {
        // Grab the requesting user's id from the parameters
        let requestingId = req.params.userid;
        // Grab the requested user's id from the req payload
        let requestedId = req.user._id;
        // Check if the friend request was made
        let requestedUser = await User.findById(requestedId).exec();
        let friendRequestsArray = requestedUser.friendRequests;
        // Loop over the friendRequests Array
        for (let request of friendRequestsArray) {
            if (String(request._id) === requestingId) {
                // There was a valid friend request
                // Find the index of request
                let requestIdIndex = friendRequestsArray.indexOf(request);
                // Remove the request from the friendRequestArray
                // Add the requesting id in the requested friends array
                friendRequestsArray.splice(requestIdIndex, 1);
                let user = await User.findByIdAndUpdate(requestedUser._id, {
                    $set: { friendRequests: friendRequestsArray },
                    $push: { friends: requestingId },
                });
                // Add the the requested user's id in the requesting user's friends array
                await User.findByIdAndUpdate(
                    requestingId,
                    {
                        $push: { friends: requestedId },
                    },
                    { new: true },
                );

                return res.status(200).json(
                    {
                        message: 'Successfully accepted friend request',
                        user,
                    },
                    { new: true },
                );
            } else {
                // There is no valid friend request
                return res.json({
                    message: 'User did not send friend request!',
                });
            }
        }
    } catch (err) {
        return next(err);
    }
};
