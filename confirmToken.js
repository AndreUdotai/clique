
const confirmToken = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        const tokens = req.user.tokens;

        const returnedToken = tokens.filter(t => t.token === token);

        if(returnedToken.length){
            next();
        } else {
            res.json({
                message: 'You are not logged in!'
            })
        }
    }
}

module.exports = { confirmToken }