import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

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
    const res = await axios.post(`${baseURL}/auth/register`, {
      body: { fullName, email, password, confirmPassword },
    });
    return res;
  };

  static activateUser = async ({ email, OTPCode }: { email: string; OTPCode: string }) => {
    const res = await axios.post(`${baseURL}/auth/activate`, {
      body: { email, OTPCode },
    });
    return res;
  };

  static authenticate = async ({ email, password }: { email: string; password: string }) => {
    const res = await axios.post(`${baseURL}/auth/login`, {
      body: {
        email,
        password,
      },
    });

    return res;
  };

  static fetchNotes = async (token: string) => {
    const res = await axios.get(`${baseURL}/notes/`, { headers: { Authorization: `Bearer ${token}` } });

    return res;
  };
  static createNotes = async ({
    token,
    content,
    title,
    tag,
  }: {
    token: string;
    title: string;
    content: string;
    tag?: string;
  }) => {
    const res = await axios.post(
      `${baseURL}/notes/create`,
      { body: { title, content, tag } },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return res;
  };
}

export default API;
