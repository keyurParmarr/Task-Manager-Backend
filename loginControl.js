const Task = require("./taskModel");
const lodash = require("lodash");
const bcrypt = require("bcrypt-nodejs");
const { genToken, getUserfromToken } = require("./token");

const logincontrol = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Task.findOne({ email });
    const pass = bcrypt.compareSync(password, data.password);
    if (data) {
      if (pass) {
        const otherData = lodash.omit(data.toJSON(), "password", "__v");
        const token = genToken(email);
        if (token) {
          otherData.token = token;
          return res.json(otherData);
        }
      } else {
        return res.json({ msg: "Wrong credentials" });
      }
    }
    res.json({ msg: "no email exists" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = logincontrol;
