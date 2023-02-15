const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const {
  isValidRole: isRoleValid,
  isEmailValid,
  isUserExistById,
} = require('../helpers/db-validators');
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require('../controllers/users');

const router = Router();

router.get(
  '/',
  [
    check('offset', 'offset must be a number').isNumeric().optional(),
    check('limit', 'limit must be a number').isNumeric().optional(),
    validateFields,
  ],
  getUsers
);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'Password is required and must be more than 6 characters '
    ).isLength({ min: 6 }),
    // check('email', 'Email is not valid').isEmail(),
    check('email').custom(isEmailValid),
    // check('role','Role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  postUsers
);

router.put(
  '/:id',
  [
    check('id', 'invalid ID').isMongoId(),
    check('id').custom(isUserExistById),
    // check('role','Role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(isRoleValid),
    validateFields,
  ],
  putUsers
);

router.delete(
  '/:id',
  check('id', 'invalid ID').isMongoId(),
  check('id').custom(isUserExistById),
  validateFields,
  deleteUsers
);

module.exports = router;
