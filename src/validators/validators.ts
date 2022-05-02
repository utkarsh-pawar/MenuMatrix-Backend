import { check } from 'express-validator';

export const validateContactNumber = [
  check('contact_no').isLength({ min: 10, max: 10 }).withMessage('Enter valid phone number..!!'),
];
