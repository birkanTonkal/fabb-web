var express = require('express');

const UserController = require('../controllers/UserController');

var router = express.Router();

router.get('/', UserController.getAllUsers);

module.exports = router;
