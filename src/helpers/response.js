import { defaultResponseObject } from '../constants/responseObject';

export const success = data => {
  const response = { ...defaultResponseObject };
  response.data = data;
  return response;
};

export const error = e => {
  const response = { ...defaultResponseObject };
  response.error = e.message || e;
  response.success = false;
  return response;
};
