const { body, validationResult } = require('express-validator');

exports.createUser = [
    body('email').notEmpty(),
    body('password').notEmpty(),
    /* body('phone_number').if(body('phone_number').exists()).isMobilePhone(), */
];
