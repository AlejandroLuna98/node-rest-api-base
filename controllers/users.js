const { response } = require('express');

const getUsers = (req, res = response) => {
  const {query} = req;
  console.log(query)
  res.json({
    msg: 'get Api - Controller',
    query
  });
};

const postUsers = (req, res = response) => {

  const {nombre, edad} = req.body;


  res.json({
    msg: 'post Api - Controller',
    nombre,
    edad
  });
};
const putUsers = (req, res = response) => {

  const {id} = req.params
  res.json({
    msg: 'put Api - Controller',
    id
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: 'delete Api - Controller',
  });
};

module.exports = {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers
};
