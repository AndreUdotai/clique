import User from '../models/User';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
// import async from 'async';

// Display list of all Users.
exports.user_list = async (req, res) => {
    try {
        let users = await User.find().exec();
        res.status(200).json({
            data: users,
            user: req.user
        });
    } catch (err) {
        return next(err);
    }
};

// Display detail page for a specific User.
exports.user_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.userid}`);
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
exports.friend_request = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.userid, { "$push": { "friendRequests": req.user._id }}, { "new": true } ).exec();
        res.status(200).json({
            message: 'Friend request successfully sent!',
            user: user,
        });
    } catch(err){
        return next(err)
    }
}

exports.reject_request = async (req, res) => {
    try {
        // Grab the requesting id from the parameters
        let reqId = req.params.userid;
        // Check if the request id exists in the friend request array
        let user = await User.findById(req.user._id).exec();
        let friendRequestsArray = user.friendRequests;
        // Loop over the friendRequests Array
        for(let request of friendRequestsArray){
            if (String(request._id) === reqId){
                // There is a valid friend request
                // Find the index of request
                let requestIndex = friendRequestsArray.indexOf(request);
                // Remove the request from the friendRequestArray
                friendRequestsArray.splice(requestIndex, 1);

                await User.findByIdAndUpdate(user._id, {friendRequests: friendRequestsArray});

                return res.status(200).json({message: "Successfully declined friend request",user})
            } else {
                // There is no valid friend request
                return res.json({message: "User did not send friend request!"})
            }
        }
    } catch(err) {
        return next(err);
    } 
}

// exports.accept_request = async (req, res) => {
//     try {
//         // Check if there was a friend request from the requesting user
//         let user = await User.findById(req.user._id).exec();
//         let requestingUserId = req.params.userid;
//         console.log(user.friendRequests);
//         console.log(requestingUserId);

//         res.status(200).json({
//             message: `Request successful`,
//             user: user
//         })
//     } catch(err){
//         return next(err)
//     }
// }