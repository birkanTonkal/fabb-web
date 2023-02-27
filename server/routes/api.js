const express = require('express');
const userRouter = require('./user');
const incidentRouter = require('./incident');
const app = express();

app.use('/user/', userRouter);
app.use('/incident', incidentRouter);

module.exports = app;
