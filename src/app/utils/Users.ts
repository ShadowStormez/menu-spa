import axios from 'axios';

export const apiSignUp = async (username: string, mobile: string, password: string) => {
  try {
    const newUser = { id: generateRandomUUID(), username, mobile, password };
    await axios.post('/api/v1/users', newUser);
    return newUser;
  } catch (error) {
    throw new Error('Sign-up failed!');
  }
};

// Helper function to generate a random UUID
const generateRandomUUID = (): string => {
  return crypto.randomUUID();  // Assuming this API is available in your environment
};

export const apiLogin = async (usernameOrPhone: string, password: string) => {
  try {
    const loginUser = { usernameOrPhone, password };
    const loginUrl = 'https://menyou.darkube.app/api/v1/auth/login';
    const response = await axios.post(loginUrl, loginUser);
    
    // Extracting 'id' from the response
    const { id } = response.data;  // Assuming the response has an 'id' field
    return { id };  // Returning the id from the response
  } catch (error) {
    throw new Error('Login failed!');
  }
};
