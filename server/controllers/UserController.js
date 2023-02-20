const { db } = require("../firestore/index")
const functions = require('firebase-functions');

const userRef = db.collection('users')
exports.getAllUsers = functions.https.onRequest((req, res) => {
  
  res.send("Hello");
});

