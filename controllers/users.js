const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).limit(limit).skip(offset),
  ]);
  res.json({
    total,
    users,
  });
};

const postUsers = async (req, res = response) => {
  const { name, password, email, role } = req.body;
  const user = new User({ name, password, email, role });

  // encrypt pass
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save
  await user.save();
  res.json({
    msg: 'post Api - Controller',
    user,
  });
};

const putUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...info } = req.body;

  //Validate DB
  if (password) {
    // encrypt pass
    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, info, { new: true });

  res.json({
    msg: 'put Api - Controller',
    user,
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  // Delete physically
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({
    msg: 'delete Api - Controller',
    user,
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
};
