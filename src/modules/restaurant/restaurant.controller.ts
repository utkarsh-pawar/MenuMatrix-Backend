import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import generateOtp from '../../helpers/generateOtp';
import * as returnResponse from '../../helpers/response';
import config from '../../config/env.config';
import Restaurant from './restaurant.model';

export const signup = async (req: Request, res: Response) => {
  try {
    const { contact_no } = req.body;
    const alreadyRestaurant = await Restaurant.findOne({ contact_no });
    const otp = await generateOtp();

    if (alreadyRestaurant) {
      const restaurant = await Restaurant.findOneAndUpdate({ contact_no }, { otp: otp }, { new: true });
      const result = returnResponse.success(restaurant);
      return res.status(200).json(result);
    } else {
      const restaurant = await Restaurant.create({ contact_no, otp });
      const result = returnResponse.success(restaurant);
      return res.status(200).json(result);
    }
  } catch (e: any) {
    const error = returnResponse.error(e);
    res.status(400).json(error);
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { contact_no, otp } = req.body;
    console.log(contact_no);

    const restaurant = await Restaurant.findOne({ contact_no });

    if (restaurant.otp !== otp) {
      return res.status(400).json('Incorrect Otp..!!');
    }

    const token = jwt.sign({ contact_no, role: restaurant.role,restaurantID:restaurant._id }, config.JWT_SECRET!);

    await Restaurant.findOneAndUpdate({ contact_no }, { token }, { new: true });

    const result = returnResponse.success({ token: token });
    res.status(200).json(result);
  } catch (e) {
    const error = returnResponse.error(e);
    res.status(400).json(error);
  }
};
