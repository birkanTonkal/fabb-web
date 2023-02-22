const express = require('express');
const UserController = require('../controllers/UserController');
const validator = require('../validator/validator');

const router = express.Router();

router.post('/create', validator.createUser, UserController.createUser);

module.exports = router;
