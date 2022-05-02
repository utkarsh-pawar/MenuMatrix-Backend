import express from 'express';
import * as userController from './user.controller';
import * as validator from '../../validators/validators';
import runValidation from '../../validators/runValidator';
import auth from '../../middleware/auth';

const router = express.Router();

router.post('/signup', validator.validateContactNumber, runValidation, userController.signup);
router.post('/verifyotp', userController.verifyOtp);


export default router;
