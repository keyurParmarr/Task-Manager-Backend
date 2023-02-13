const Task = require("./taskModel");
const { genToken } = require("./token");
const bcrypt = require("bcrypt-nodejs");

const signupControl = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Task.findOne({ email });
    if (!data) {
      const pass = bcrypt.hashSync(password);
      let useradd = await Task.create({ email, password: pass });
      const token = genToken(email);
      if (token) {
        useradd = useradd.toJSON();
        useradd.token = token;
        return res.json(useradd);
      }
    }
    res.json({ msg: "email already exists" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = signupControl;
