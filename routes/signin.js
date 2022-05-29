const signinRoutes = require('express').Router();
const { signinValidation, signupValidation } = require('../validation/signin');
const { login, createUser } = require('../controllers/users');

signinRoutes.post('/signin', signinValidation, login);
signinRoutes.post('/signup', signupValidation, createUser);

module.exports = signinRoutes;
