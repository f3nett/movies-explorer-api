const usersRoutes = require('express').Router();
const { patchUserValidation } = require('../validation/users');
const { getUser, updateUser } = require('../controllers/users');

usersRoutes.get('/me', getUser);
usersRoutes.patch('/me', patchUserValidation, updateUser);

module.exports = usersRoutes;
