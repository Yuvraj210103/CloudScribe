import { RequestHandler } from './config';

class API {
  static registerUser = async ({
    email,
    fullName,
    password,
    confirmPassword,
  }: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const res = await RequestHandler.post('/auth/register', {
      body: { fullName, email, password, confirmPassword },
    });
    return res;
  };

  static activateUser = async ({ email, OTPCode }: { email: string; OTPCode: string }) => {
    const res = await RequestHandler.post('/auth/activate', {
      body: { email, OTPCode },
    });
    return res;
  };
}

export default API;
