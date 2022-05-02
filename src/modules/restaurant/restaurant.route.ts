import express from 'express';
import * as restaurantController from './restaurant.controller';
import * as validator from '../../validators/validators';
import runValidation from '../../validators/runValidator';

const router = express.Router();

router.post('/signup', validator.validateContactNumber, runValidation, restaurantController.signup);
router.post('/verify-otp', restaurantController.verifyOtp);

// router.get('/', userController.getAll);

export default router;
