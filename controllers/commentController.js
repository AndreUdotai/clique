import { body, validationResult } from 'express-validator';
import Comment from '../models/Comment';

// Display list of all Commnents for a particular post.
export function comment_list(req, res) {
    res.send('NOT IMPLEMENTED: Comment list');
}

// Display detail page for a specific Comment.
export function comment_detail(req, res) {
    res.send(`NOT IMPLEMENTED: Comment detail: ${req.params.id}`);
}

// Handle Comment create on POST.
export const comment_create = [
    // validate and sanitize fields.
    body('body', 'You did not enter a comment!')
        .trim()
        .isLength({ min: 1 }),
    
    // Process request after validation and sanitization.
    async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a Comment Object with trimmed data.
        const comment = new Comment({
            body: req.body.body,
            user: req.user._id,
            post: req.params.postid,
        });

        if (!errors.isEmpty()) {
            // There are errors.
            res.status(400).json({
                message: "You did not enter a comment!",
                errors: errors,
            });
            return;
        } else {
            try {
                await comment.save();
                res.status(200).json({
                    message: "Your comment was saved!",
                });
            } catch (err) {
                return next(err);
            }
        }
    }
]

// Handle Comment delete on POST.
export function comment_delete(req, res) {
    res.send('NOT IMPLEMENTED: Comment delete POST');
}

// Handle Comment update on POST.
export function comment_update(req, res) {
    res.send('NOT IMPLEMENTED: Comment update POST');
}
