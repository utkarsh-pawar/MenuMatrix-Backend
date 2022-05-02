import express, { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';
import generateOtp from '../../helpers/generateOtp';

import * as returnResponse from '../../helpers/response';
import User from './user.model';
import config from '../../config/env.config';

interface userInterface extends Request {
  profile?: any;
  token?: string;
  role?: string;
}

export const signup = async (req: Request, res: Response) => {
  try {
    const { contact_no } = req.body;
    const alreadyUser = await User.findOne({ contact_no });

    const otp = await generateOtp();
    if (alreadyUser) {
      const user = await User.findOneAndUpdate({ contact_no }, { otp: otp }, { new: true });
      const result = returnResponse.success(user);
      return res.status(200).json(result);
    } else {
      const user = await User.create({ contact_no, otp });
      const result = returnResponse.success(user);
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

    const user = await User.findOne({ contact_no });

    if (user.otp !== otp) {
      return res.status(400).json('Incorrect Otp..!!');
    }

    const token = jwt.sign({ contact_no, role: user.role, userID: user._id }, config.JWT_SECRET!);

    await User.findOneAndUpdate({ contact_no }, { status: 'verified', token }, { new: true });

    const result = returnResponse.success({ token: token });
    res.status(200).json(result);
  } catch (e) {
    const error = returnResponse.error(e);
    res.status(400).json(error);
  }
};

export const editProfile = async (req: userInterface, res: Response) => {
  try {
    const { first_name, last_name, email } = req.body;
    const { _id } = req.profile;
    const updatedUser = await User.findByIdAndUpdate({ _id }, { first_name, last_name, email }, { new: true });
    const result = returnResponse.success(updatedUser);
    res.status(200).json(result);
  } catch (e) {
    const error = returnResponse.error(e);
    res.status(400).json(error);
  }
};
