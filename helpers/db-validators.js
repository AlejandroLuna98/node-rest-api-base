const Role = require('../models/role');
const user = require('../models/user');

const isRoleValid = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`Role ${role} is not valid`);
  }
};

const isEmailValid = async (email = '') => {
  const emailExist = await user.findOne({ email });
  if (emailExist) {
    throw new Error(`Email ${email} already exists`);
  }
};

const isUserExistById = async (id) => {
  const userExist = await user.findById(id);
  if (!userExist) {
    throw new Error(`Id ${id} don't exists`);
  }
};

module.exports = {
  isValidRole: isRoleValid,
  isEmailValid,
  isUserExistById
};
