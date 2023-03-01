const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: 'Incorrect User/Password ',
      });
    }
    // Verify the user
    if (!user.state) {
      return res.status(400).json({
        msg: 'Incorrect User/Password - state: false',
      });
    }
    //Verify the pass
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Incorrect User/Password - state: false',
      });
    }
    // Generate JWT
    const token = await generateJWT(user.id);
    res.json({
      msg: 'Login ok',
      user,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: ' Contact the admin',
    });
  }
};

module.exports = login;
