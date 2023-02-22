const {db, auth} = require('../firebase/database');
const { validationResult } = require('express-validator');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require('firebase/auth');


exports.createNewUser = async (req, res) => {
    const ref = db.ref('users');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body);
    /* const userScheme = {
        fullName:
    } */
    const newUserRef = ref.push({ name: 'birkan', date_of_birth: 'June 23, 1912', full_name: 'Alan Turing' });
    const newUserKey = newUserRef.key;
    res.send('sa');
};


exports.createUser = async (req, res) => {
    auth.createUser({
    email: req.body.email,
    emailVerified: false,
    phoneNumber: req.body.phone_number,
    password: req.body.password,
    displayName: req.body.full_name,
    disabled: false,
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
    res.send(userRecord)
  })
  .catch((error) => {
    res.send(error)
  });
}


exports.getUser = async (req, res) => {
  res.send("selamlar")
}
