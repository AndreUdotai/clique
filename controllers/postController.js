import { body, validationResult } from 'express-validator';
import Post from '../models/Post';
import Comment from '../models/Comment';
import async from 'async';

// Display list of all posts.
export async function post_list(req, res, next) {
    try {
        // Fetch all the posts in the database
        let posts = await Post.find({}).populate('user').exec();
        // Filter the posts that were made by logged in user or frieds
        let indexPosts = posts.filter((post) => {
            return (
                JSON.stringify(post.user._id) === JSON.stringify(req.user._id) ||
                post.user.friends.includes(req.user._id)
            );
        });

        res.status(200).json({
            message: 'All posts!',
            indexPosts,
        });
    } catch (err) {
        return next(err);
    }
}

// Display detail page for a specific Post.
export async function post_detail(req, res, next) {
    try {
        let post = await Post.findById(req.params.postid)
            .populate('user')
            .exec();

        if (post === null) {
            // No results.
            const err = new Error('Post not found!');
            err.status = 404;
            return next(err);
        }
        
        let comments = await Comment.find({ post: req.params.postid }).exec();
        
        let numOfLikes = post.likes.length;
        let numOfComments = comments.length;

        // Successful, so render.
        res.status(200).json({
            message: 'View post.',
            post,
            numOfLikes,
            comments,
            numOfComments,
        });
    } catch (err) {
        return next(err);
    }
}

export const post_create = [
    // Validate and sanitize fields: body, user
    body('body', 'Post content must no tbe empty.').trim().isLength({ min: 1 }),

    // Process request after validation and sanitization.
    async (req, res, next) => {
        // Extract the validation and sanitization.
        const errors = validationResult(req);

        // Create a Post object with escapted and trimmed data.
        const post = new Post({
            body: req.body.body,
            user: req.user._id,
        });

        if (!errors.isEmpty()) {
            // THere are errors. Render form again with sanitized values/error messages.
            res.status(400).json({
                post,
                errors: errors.array(),
            });
            return;
        } else {
            try {
                // Data from form is valid. Save post.
                await post.save();
                res.status(200).json({
                    message: 'Post created successfully',
                    post,
                });
            } catch (err) {
                return next(err);
            }
        }
    },
];

// Handle Post delete on POST.
export function post_delete(req, res) {
    res.send('NOT IMPLEMENTED: Post delete POST');
}

// Handle Post update on POST.
export function post_update(req, res) {
    res.send('NOT IMPLEMENTED: Post update POST');
}

// Handle Post like on PUT
export async function post_like(req, res, next) {
    try {
        let post = await Post.findByIdAndUpdate(
            req.params.postid,
            {
                $push: { likes: req.user._id },
            },
            { new: true },
        );

        if (post == null) {
            // No results.
            const err = new Error('Post not found!');
            err.status = 404;
            return next(err);
        }

        return res.status(200).json({
            message: 'Successfully liked post',
            post,
        });
    } catch (err) {
        return next(err);
    }
}
