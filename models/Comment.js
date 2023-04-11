import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

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
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    post: {
        type: _Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
      },
});

// Export model
export default model('Comment', CommentSchema);