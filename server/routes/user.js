const express = require('express');
const UserController = require('../controllers/UserController');
const validator = require('../validator/validator');

const router = express.Router();

router.post('/signup', validator.createUser, UserController.createUser);
router.get('/signin', validator.getUserByEmailPassword, UserController.getUserByEmailPassword);

module.exports = router;
