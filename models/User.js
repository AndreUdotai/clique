const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 16,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    Full_name: {
        type: String,
    },
    email_address: {

    },
    friends: {

    },
    friend_requests: {

    },
    user_since: {

    },
    profile_picture: {

    },
    bio: {

    },
    is_email_verified: {

    },
    is_admin: {
        
    }

});

// Export model
module.exports = mongoose.model('User', UserSchema);