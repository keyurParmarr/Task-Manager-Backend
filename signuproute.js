const express = require("express");
const signupControl = require("./signupControl");
const signuprouter = express.Router();
signuprouter.post("/", signupControl);
module.exports = signuprouter;
