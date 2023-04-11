import { Schema as _Schema, model } from 'mongoose';

const Schema = _Schema;

const PostSchema = new Schema({
    body: {
        type: String,
        minLength: 3,
        maxLength: 1000,
        required: true,
    },
    likes: [
        {
            type: _Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: _Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

// Export model
export default model('Post', PostSchema);