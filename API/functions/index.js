const functions = require("firebase-functions");
require("dotenv").config;
const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
app.use(cors({origin: true}));
app.use(routes);
// const increment = admin.firestore.FieldValue.increment(1)


// Api para um função em nuvem do firebase
exports.app = functions.https.onRequest(app);
