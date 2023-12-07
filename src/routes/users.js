const { Router } = require('express');
const routers = Router();
const { renderSignUpForm, signup, renderSignInForm, signin, logout } = require('../controllers/users');

routers.get('/users/signup', renderSignUpForm);
routers.post('/users/signup', signup);

routers.get('/users/signin', renderSignInForm);
routers.post('/users/signin', signin);

routers.get('/users/logout', logout);

module.exports = routers;