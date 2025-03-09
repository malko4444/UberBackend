const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userMiddlewars = require('../middleware/userMiddlewars'); // ✅ Fix applied
const { registerUser, loginUser,userProfile,logOutUser} = require('../controller/userController'); // ✅ Fix applied
// const { userProfile } = require( '../middleware/userMiddlewars') // ✅ Fix applied
router.post('/register', [
    body('fullname.firstName').not().isEmpty().withMessage('First Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password length is min 6'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password length is min 6'),
], loginUser);

// this automatically get the req and send the res in this format 
// app.get('/userProfile', (req, res) => {
//     userMiddlewars.authUser(req, res, () => {
//         userProfile(req, res);
//     });
// }); the internal working of this code is this
// this is the way to use the middleware in the route

router.get('/userProfile', userMiddlewars.authUser,userProfile)
router.post('/logout', userMiddlewars.authUser,logOutUser )

module.exports = router;
