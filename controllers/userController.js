const User = require('../models/User');

// Display list of all Users.
exports.user_list = (req, res) => {
    res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific User.
exports.user_detail = (req, res) => {
    res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
};

// Handle User register.
exports.user_register = (req, res) => {
    res.send('NOT IMPLEMENTED: User create');
};

// Handle User Login.
exports.user_login = (reg, res) => {
    res.send('NOT IMPLEMENTED: User Login')
}

// Handle User delete.
exports.user_delete = (req, res) => {
    res.send('NOT IMPLEMENTED: User delete');
};

// Handle User update.
exports.user_update = (req, res) => {
    res.send('NOT IMPLEMENTED: User update POST');
};
