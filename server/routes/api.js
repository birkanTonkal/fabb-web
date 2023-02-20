const express = require("express");
const userRouter = require("./user");

const app = express();

app.use("/user/", userRouter);


module.exports = app;