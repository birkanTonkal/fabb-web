const express = require('express');
const UserController = require('../controllers/UserController');
const validator = require('../validator/validator');

const router = express.Router();

router.post('/signup', validator.createUser, UserController.createUser);
router.get('/signin', validator.getUserByEmailPassword, UserController.getUserByEmailPassword);
router.delete('/delete/', UserController.deleteUserByUserId);
router.get('/:user_id', validator.getUserByUserId, UserController.getUserByUserId);
router.put('/update', validator.updateUser, UserController.updateUser);
router.get('/verify/:email', UserController.verifyUserSession);
router.get('/logout/:email', UserController.logoutUser)

module.exports = router;
