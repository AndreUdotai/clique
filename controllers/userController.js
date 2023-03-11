const User = require('../models/User');

// Display list of all Users.
exports.user_list = (req, res) => {
    res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User.
exports.user_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
};

// Handle User create on POST.
exports.user_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: User create POST');
};

// Handle User delete on POST.
exports.user_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Handle User update on POST.
exports.user_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: User update POST');
};
