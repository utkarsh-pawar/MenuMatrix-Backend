import otpGenerator from 'otp-generator';

const generateOtp = () => {
  return otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });
};

export default generateOtp;
