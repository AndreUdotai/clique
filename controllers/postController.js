const Post = require('../models/Post');

// Display list of all posts.
exports.post_list = (req, res) => {
    res.send('NOT IMPLEMENTED: Post list');
};

// Display detail page for a specific Post.
exports.post_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: Post detail: ${req.params.id}`);
};

// Handle Post create on POST.
exports.post_create = (req, res) => {
    res.send('NOT IMPLEMENTED: Post create POST');
};

// Handle Post delete on POST.
exports.post_delete = (req, res) => {
    res.send('NOT IMPLEMENTED: Post delete POST');
};

// Handle Post update on POST.
exports.post_update = (req, res) => {
    res.send('NOT IMPLEMENTED: Post update POST');
};
