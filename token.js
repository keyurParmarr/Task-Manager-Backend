const jwt = require("jsonwebtoken");
const Task = require("./taskModel");
const genToken = (email) => {
  if (email) {
    const token = jwt.sign({ email }, "SECRET", {
      expiresIn: "1 day",
    });
    return token;
  }
};

const getUserfromToken = async (req, res) => {
  const token = req.body.token;
  try {
    const data = jwt.verify(token, "SECRET");
    if (data) {
      const userData = await Task.findOne(
        { email: data.email },
        { password: 0, __v: 0 }
      );
      res.json(userData.toJSON());
    }
  } catch (error) {
    console.log(error.message, "kok");
    res.json({ success: false });
  }
};

module.exports = { genToken, getUserfromToken };
