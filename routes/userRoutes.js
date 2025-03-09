const express = require( 'express' );
const router = express.Router();
const {body} = require('express-validator');
const registerUser = require('../controller/userController');


router.post( '/register', [
    body('fullname.firstName').not().isEmpty().withMessage('First Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password length is min 6'),
],registerUser)


module.exports = router;    