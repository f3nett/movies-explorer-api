const protectedRoutes = require('express').Router();
const loginRoutes = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const signinRoutes = require('./signin');

loginRoutes.use('/', signinRoutes);

protectedRoutes.use('/users', usersRoutes);
protectedRoutes.use('/movies', moviesRoutes);

module.exports = { loginRoutes, protectedRoutes };
