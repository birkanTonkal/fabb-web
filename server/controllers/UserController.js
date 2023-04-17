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
            user_id: 0,
            full_name: userRecord.displayName,
            phone_number: userRecord.phoneNumber,
            email: userRecord.email,
            user_type: "normal",
            incidents: [''],
            liked_incidents: [''],
            disliked_incidents: [''],
            location: { longtitude: 0, latitude: 0 },
            create_date: Date.now(),
        };

        let insertedData = ref.push(newUser, (error) => {
            if (error) {
                res.send(error);
            }
        });

        let user_id = insertedData.getKey();
        insertedData.update({ user_id: user_id }, (error) => {
            if (error) {
                res.send(error);
            }
        });
        newUser['user_id'] = user_id;

        res.send(newUser);
    } catch (err) {
        res.send(err);
    }
};


exports.getUserByEmailPassword = async (req, res) => {
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    } */
    try {
        const ref = db.ref('users');
        const accountData = await axios.post(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCw9sDWVWJGsQlUA3_pqnRO-XNRZj27Xtw',
            {
                email: req.query.email,
                password: req.query.password,
            }
        );
        revokeToken(req.query.email)
        const account_id = accountData.data.localId;
       
        const user = await searchByField(ref, account_id, 'account_id');
       
    
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.verifyUserSession = async (req, res) => {

    auth.getUserByEmail(req.params.email)
  .then(function(userRecord) {
    console.log(userRecord)
    const tokenValidTime =  new Date(userRecord.tokensValidAfterTime)
    tokenValidTime.setHours(tokenValidTime.getHours() + 3);
    const currentDate = new Date().getTime()
    res.send(currentDate < tokenValidTime);
  })   
}

function revokeToken(email) {
    auth.getUserByEmail(email)
    .then(function(userRecord) {
      let userUid =  userRecord.uid
      auth.revokeRefreshTokens(userUid).then((res) => {

      })      
    })
}

exports.logoutUser = async (req, res) => {
    revokeToken(req.params.email)
}

exports.getUserByUserId = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    }
    try {
        const userRef = db.ref(`users/${req.params.user_id}`);
        let user = await userRef.once('value', (snapshot) => {
            if (snapshot.exists()) {
                res.send(snapshot.val());
            } else {
                res.status(400).send('user not exist');
            }
        });
    } catch (err) {
        res.send(err);
    }
};

exports.deleteUserByUserId = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    }
    try {
        const userRef = db.ref(`users/${req.body.user_id}`);
        await userRef.remove((error) => {
            if (error) {
                res.send(error);
            }
        });
        await auth.deleteUser(req.body.account_id);
        res.status(200).send('success');
    } catch (err) {
        res.send(err);
    }
};

exports.updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(406).json({ errors: errors.array() });
    }
    try {
        await auth.updateUser(req.body.account_id, req.body);
        const userRef = db.ref(`users/${req.body.user_id}`);
        await userRef.update(req.body, (error) => {
            if (error) {
                res.send(error);
            }
        });
        res.status(200).send('success');
    } catch (err) {
        res.send(err);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const ref = db.ref('users'); 
        await ref.once('value', (data) => {
            if (data) {
                res.send(data.val());
            } else {
                res.status(500).send('fail oldu be naparsin >)');
            }
        });
    }
    catch {

    }
}

function searchByField(ref, fieldValue, fieldName) {
    return ref
        .orderByChild(fieldName)
        .equalTo(fieldValue)
        .once('value', function (snapshot) {
            return snapshot.val();
        });
}


