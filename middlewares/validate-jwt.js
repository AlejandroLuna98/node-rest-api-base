const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'Missed token',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      msg: 'Invalid token',
    });
  }
};

module.exports = {
  validateJWT,
};
