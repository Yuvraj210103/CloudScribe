import { RequestHandler } from './config';

class API {
  static register = async (fullName: string, email: string, password: string, confirmPassword: string) => {
    const { data } = await RequestHandler.post('/auth/register', {
      body: { fullName, email, password, confirmPassword },
    });
    return data;
  };

  static activate = async (email: string, OTPCode: string) => {
    const { data } = await RequestHandler.post('/auth/activate', {
      body: { email, OTPCode },
    });
    return data;
  };
}

export default API;
