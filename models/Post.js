const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    body: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Export model
module.exports = mongoose.model('Post', PostSchema);