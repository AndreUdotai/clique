const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 16,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    name: {
        type: String,
        minLength: 2,
        maxLength: 50,
        required: true,
    },
    email: {
        type: String,
        minLength: 5,
        maxLength: 100,
        required: true,
        unique: true,
    },
    friends: [
        // {
        //     timestamp: {
        //         type: Date,
        //         default: Date.now,
        //     }
        // },
        {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
        },
    ],
    friendRequests: [
        // {
        //     timestamp: {
        //         type: Date,
        //         default: Date.now,
        //     }
        // },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    userSince: {
        type: Date,
        default: Date.now,
    },
    profilePicture: {
        type: String,
        // required: true,
    },
    bio: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    facebookId: {
        type: String,
        required: false,
    },
    tokens: [
        {
            type: Object,
        },
    ],
});

// Export model
module.exports = mongoose.model('User', UserSchema);
