import axios from 'axios';
import {generateRandomUUID} from './UuidCreator'

export const apiSignUp = async (username: string, mobile: string, password: string) => {
  try {
    const newUser = { id: generateRandomUUID(), username, mobile, password };
    await axios.post('http://menyou-svc-gw.darkube.app/api/v1/users', newUser);
    return newUser;
  } catch (error) {
    throw new Error('Sign-up failed!');
  }
};

export const apiLogin = async (usernameOrMobile: string, password: string) => {
  try {
    const loginUser = { usernameOrMobile, password };
    const loginUrl = 'http://menyou-svc-gw.darkube.app/api/v1/auth/login';

    const response = await axios.post(loginUrl, loginUser, { withCredentials: true });

    // Extract user ID and token
    const { id } = response.data.user;
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);

    // Return both id and token
    return { id, access_token };
  } catch (error) {
    const err = error as Error;
    throw new Error('Login failed: ' + err.message);
  }
};

