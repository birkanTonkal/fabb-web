const { db, auth } = require('../firebase/database');
const { validationResult } = require('express-validator');
const axios = require('axios');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    }
    try {
        const ref = db.ref('users');

        const createUserData = {
            email: req.body.email,
            emailVerified: false,
            phoneNumber: req.body.phone_number,
            password: req.body.password,
            displayName: req.body.full_name,
            disabled: false,
        };
        const userRecord = await auth.createUser(createUserData);

        const newUser = {
            account_id: userRecord.uid,
            date_of_birth: '',
            full_name: userRecord.displayName,
            phone_number: userRecord.phoneNumber,
            email: userRecord.email,
            incidents: [],
            liked_incidents: [],
            disliked_incidents: [],
            location: { longtitude: 0, latitude: 0 },
        };

        ref.push(newUser);
        res.send(newUser);
    } catch (err) {
        res.send(err);
    }
};

exports.getUserByEmailPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    }
    try {
        const ref = db.ref('users');
        const accountData = await axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw9sDWVWJGsQlUA3_pqnRO-XNRZj27Xtw',
            {
                email: req.body.email,
                password: req.body.password,
            }
        );
        const account_id = accountData.data.localId;
        const user = await searchByField(ref, account_id, 'account_id');
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

function searchByField(ref, fieldValue, fieldName) {
    return ref
        .orderByChild(fieldName)
        .equalTo(fieldValue)
        .once('value', function (snapshot) {
            return snapshot.val();
        });
}
