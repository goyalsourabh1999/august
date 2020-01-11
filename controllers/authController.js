const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const KEY = require("../configs/config").KEY;
// Signup
module.exports.signup = async function(req, res) {
  // 1. create user
  try {
    const user = await userModel.create(req.body);
    // payload
    const id = user["_id"];
    // 2.create Token
    const token = await jwt.sign(JSON.stringify(id), KEY);
    // 3. Send the token
    res.json({
      user,
      token
    });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

// Login
module.exports.login = async function(req, res) {
  try {
    // email,password
    const { email, password } = req.body;
    const user = await userModel.findOne({email});
    console.log(user);
    const dbPassword = user.password;
    console.log(dbPassword);
    if (dbPassword == password) {
      const id = user["_id"];
      const token = await jwt.sign(JSON.stringify(id), KEY);
      console.log(token);
      return res.json({
        user,
        token
      });
    }
  } catch (err) {
    return res.json({
      err
    });
  }
};
