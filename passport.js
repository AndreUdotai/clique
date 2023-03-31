import bcrypt from 'bcryptjs';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

import User from './models/User';

// Login logic
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

// Protected requests
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey',
        },
        async function (jwtPayload, cb) {
            // return cb(null, jwt_payload)
            //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
            try {
                const user = await User.findById(jwtPayload.user._id);
                return cb(null, user);
            } catch (err) {
                return cb(err);
            }
        },
    ),
);
