import User from '../models/User';
import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';

// Display list of all Users.
exports.user_list = (req, res) => {
    res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User.
exports.user_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
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
                let found_username = await User.findOne({ username: user.username }).exec();

                if (found_username) {
                    // User with same username already exist, Render form again with sanitized values/errors messages.
                    res.status(400).json({
                        user: user,
                        usernameError: 'Username already exists!',
                    });
                    return;
                }; 

                bcrypt.hash(user.password, 10, (err, hashedPassword) => {
                    if (err) {
                        return next(err);
                    }
                    user.password = hashedPassword;
                    user.save()
                        .then(() => {
                            res.status(200).json({
                                message: 'User created successfully',
                                user: user,
                            })
                        })
                        .catch((err) => {
                            return next(err);
                        })
                });
            } catch(err) {
                return next(err);
            }
        }
    },
];

// Handle User Login.
exports.user_login = (reg, res) => {
    res.send('NOT IMPLEMENTED: User Login');
};

// Handle User delete.
exports.user_delete = (req, res) => {
    res.send('NOT IMPLEMENTED: User delete');
};

// Handle User update.
exports.user_update = (req, res) => {
    res.send('NOT IMPLEMENTED: User update POST');
};

// passport.use(
//     new LocalStrategy(async(username, password, done) => {
//       try {
//         const user = await User.findOne({ username: username });
//         if (!user) {
//           return done(null, false, { message: "Incorrect username" });
//         };
//         if (user.password !== password) {
//           return done(null, false, { message: "Incorrect password" });
//         };
//         return done(null, user);
//       } catch(err) {
//         return done(err);
//       };
//     });
//   );
