const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../controller/userController'); // ✅ Fix applied

router.post('/register', [
    body('fullname.firstName').not().isEmpty().withMessage('First Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password length is min 6'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password length is min 6'),
], loginUser);

module.exports = router;
