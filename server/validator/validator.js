const { body, validationResult } = require('express-validator');

exports.createUser = [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('phone_number').notEmpty().isMobilePhone(),
    body('full_name').notEmpty(),
    /* body('phone_number').if(body('phone_number').exists()).isMobilePhone(), */
];

exports.getUserByEmailPassword = [body('email').notEmpty(), body('password').notEmpty()];
