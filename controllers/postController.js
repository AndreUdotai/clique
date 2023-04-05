import { body, validationResult } from 'express-validator';
import Post from '../models/Post';


// Display list of all posts.
export async function post_list(req, res) {
    
}

// Display detail page for a specific Post.
export function post_detail(req, res) {
    res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
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
