const admin = require('firebase-admin');
const firebaseCredentials = require('../serviceAccountKey.json');

const app = admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    databaseURL: 'https://fabb-1469c-default-rtdb.firebaseio.com/',
});

const db = admin.database();
const auth = admin.auth();

module.exports = { db, auth };
