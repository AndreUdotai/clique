const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

import User from '../models/User';

const loginCheck = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                let user = await User.findOne({ username: username });
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect username!',
                    });
                }
                // Match Password
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        // passwords match! log user in
                        return done(null, user, {
                            message: 'Logged in successfully!',
                        });
                    } else {
                        // passwords do not match!
                        return done(null, false, {
                            message: 'Incorrect password',
                        });
                    }
                });
            } catch (err) {
                return done(err);
            }
        }),
    );
};

module.exports = { loginCheck };
