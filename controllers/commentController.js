const Comment = require('../models/Comment');

// Display list of all Commnents.
exports.comment_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Comment list');
};

// Display detail page for a specific Comment.
exports.comment_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Comment detail: ${req.params.id}`);
};

// Handle Comment create on POST.
exports.comment_create = (req, res) => {
    res.send('NOT IMPLEMENTED: Comment create POST');
};

// Handle Comment delete on POST.
exports.comment_delete = (req, res) => {
    res.send('NOT IMPLEMENTED: Comment delete POST');
};

// Handle Comment update on POST.
exports.comment_update = (req, res) => {
    res.send('NOT IMPLEMENTED: Comment update POST');
};
