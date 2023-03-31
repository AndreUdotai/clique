import jwt  from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User';

// Handle User Login authentication
exports.auth_login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            message: 'Provide username and password',
            user: req.body,
        });
    } else {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect username',
                user: req.body,
            });
        }
        passport.authenticate(
            'local',
            { session: false },
            (err, user, info) => {
                if (err || !user) {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Login Unsuccessful, check your password!',
                        user: req.body,
                    });
                }
                // Note, that {session: false} is passed in passport options so that it won't save the user in the session.
                req.login(user, { session: false }, async (err) => {
                    if (err) {
                        res.send(err);
                    }
                    // generate a signed son web token with the contents of user object and return it in the response
                    const token = jwt.sign({ user }, 'secretKey', {
                        expiresIn: '1d',
                    });

                    let oldTokens = user.tokens || []

                    if(oldTokens.length){
                        oldTokens = oldTokens.filter(t => {
                            const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
                            if(timeDiff < 86400){
                                return t
                            }
                        })
                    }

                    await User.findByIdAndUpdate( user._id, {tokens: [...oldTokens, {token, signedAt: Date.now().toString()}]});

                    return res.json({ user, token });
                });
            },
        )(req, res);
    }
};

exports.auth_logout = async (req, res) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res
                .status(401)
                .json({ success: false, messsage: 'Authorization failed!'});
        }

        const tokens = req.user.tokens;

        const newTokens = tokens.filter(t => t.token !== token);

        await User.findByIdAndUpdate(req.user._id, { tokens: newTokens })
        res.status(200).json({ message: "Signed out successfully!" });
    }
}