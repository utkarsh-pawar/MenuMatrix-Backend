import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as response from '../helpers/response';
import config from '../config/env.config';
import User from '../modules/user/user.model';
import Restaurant from '../modules/restaurant/restaurant.model';

interface JwtPayload {
  role: string;
  userID: any;
  restaurantID: any;
}

interface userInterface extends Request {
  user?: any;
  token?: string;
  role?: string;
}

const auth = async (req: userInterface, res: Response, next: NextFunction) => {
  try {
    const header = req.header('Authorization');
    const token = header?.split(' ')[1];

    if (!token) return res.status(401).send('Access Denied: No Token Provided!');

    const verified = jwt.verify(token!, config.JWT_SECRET!) as JwtPayload;

    let user;
    if (verified.role === 'USER') {
      user = await User.findById(verified.userID);
    } else if (verified.role === 'Restaurant') {
      user = await Restaurant.findById(verified.restaurantID);
    }

    req.user = user;
    req.token = token;
    req.role = verified.role;

    next();
  } catch (e) {
    const error = response.error(e);
    res.status(401).json(error);
  }
};

export default auth;
