const { ref, set } = require('firebase/database');
const { database } = require('../firebase/index');

exports.getAllUsers = async (req, res) => {
    set(ref(database, 'users/' + 'userId'), {
        username: 'za',
        email: 'az',
        profile_picture: 'xxx',
    });
};
