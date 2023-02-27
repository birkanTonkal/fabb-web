const { body, validationResult, param } = require('express-validator');

exports.createUser = [
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('phone_number').notEmpty().isMobilePhone(),
    body('full_name').notEmpty(),
    /* body('phone_number').if(body('phone_number').exists()).isMobilePhone(), */
];

exports.getUserByEmailPassword = [body('email').notEmpty(), body('password').notEmpty()];

exports.getUserByUserId = [param('user_id').notEmpty()];

exports.updateUser = [body('user_id').notEmpty()];
