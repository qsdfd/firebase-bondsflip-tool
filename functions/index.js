const functions = require('firebase-functions');
const express = require('express');

const summary = require('./summary');

const app = express();

app.get('/summary',  (request, response) => {
    response.send(summary());
});

exports.summary = functions.https.onRequest(app);