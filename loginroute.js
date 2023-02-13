const express = require("express");
const logincontrol = require("./loginControl");
const loginrouter = express.Router();
loginrouter.post("/", logincontrol);
module.exports = loginrouter;
