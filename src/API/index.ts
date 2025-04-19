import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
//const baseURL = 'http://localhost:5000/api';

class API {
  //* Auth API
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

  static forgotPassword = async (email: string) => {
    const res = await axios.post(`${baseURL}/auth/forgot`, {
      body: { email },
    });
    return res;
  };

  //*first do forgot password and then use this to reset the password
  static resetPassword = async ({
    email,
    password,
    passwordResetCode,
  }: {
    email: string;
    passwordResetCode: string;
    password: string;
  }) => {
    const res = await axios.post(`${baseURL}/auth/resetPassword`, {
      body: { email, passwordResetCode, password },
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

  //*Notes API
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

  static fetchNoteById = async ({ token, id }: { token: string; id: string }) => {
    const res = await axios.get(`${baseURL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return res;
  };

  static deleteNoteById = async ({ token, id }: { token: string; id: string }) => {
    const res = await axios.delete(`${baseURL}/notes/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    return res;
  };

  static updateNoteById = async ({
    token,
    content,
    title,
    tag,
    id,
  }: {
    id: string;
    token: string;
    title: string;
    content: string;
    tag?: string;
  }) => {
    const res = await axios.put(
      `${baseURL}/notes/update/${id}`,
      { body: { title, content, tag } },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return res;
  };
}

export default API;
