const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String,
        minLength: 1,
        maxLength: 1000,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
      },
});

// Export model
module.exports = mongoose.model('Comment', CommentSchema);