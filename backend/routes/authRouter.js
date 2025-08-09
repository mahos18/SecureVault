const { logincontroll, signupcontroll,forgotPasswordController } = require('../controller/authController');
const { Registervaldation ,Loginvaldation,ForgotValidation} = require('../middleware/authvaldiation');
const checkAuth = require('../middleware/Authuser');

const router = require('express').Router();
router.post('/login', Loginvaldation, logincontroll);
router.post('/forgot-password', ForgotValidation, forgotPasswordController);
router.post('/pass-reset', ForgotValidation, forgotPasswordController);
router.post('/register',Registervaldation ,signupcontroll)

module.exports = router;