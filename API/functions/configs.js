const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

module.exports = { db, bcrypt };
