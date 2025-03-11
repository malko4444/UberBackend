const express = require('express');
const router = express.Router();
// const captainModel = require('../models/captainModel');
const {body} = require('express-validator');
const captainController = require('../controller/captainController');

router.post('/register',[
    body('fullName.firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),

    body('fullName.lastName')
        .optional()
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),

    body('age')
        .notEmpty()
        .withMessage('Age is required')
        .isInt({ min: 18 })
        .withMessage('Age must be at least 18'),

    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    body('vehicle.color')
        .notEmpty()
        .withMessage('Vehicle color is required')
        .isLength({ min: 3 })
        .withMessage('Color must be at least 3 characters long'),

    body('vehicle.plateNumber')
        .notEmpty()
        .withMessage('Plate number is required')
        .isLength({ min: 3 })
        .withMessage('Plate number must be at least 3 characters long'),

    body('vehicle.capacity')
        .notEmpty()
        .withMessage('Vehicle capacity is required')
        .isInt({ min: 1 })
        .withMessage('Vehicle capacity must be at least 1'),

    body('vehicle.vehicleType')
        .notEmpty()
        .withMessage('Vehicle type is required')
        .isIn(['car', 'motorcycle', 'auto'])
        .withMessage('Invalid vehicle type'),
],captainController.registerCaptain);


module.exports = router;