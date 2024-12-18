import axios from 'axios';

export const apiSignUp = async (username: string, mobile: string, password: string) => {
  try {
    const newUser = { id: generateRandomUUID(), username, mobile, password };
    await axios.post('http://menyou-svc-gw.darkube.app/api/v1/users', newUser);
    return newUser;
  } catch (error) {
    throw new Error('Sign-up failed!');
  }
};

// Helper function to generate a random UUID
const generateRandomUUID = (): string => {
  return crypto.randomUUID();  // Assuming this API is available in your environment
};

export const apiLogin = async (usernameOrMobile:string, password:string) => {
  try {
    const loginUser = { usernameOrMobile, password };
    
    const loginUrl = 'http://menyou-svc-gw.darkube.app/api/v1/auth/login';
    const response = await axios.post(loginUrl, loginUser);
    
    const { id } = response.data.user;
    console.log(response.data)
    return { id };
  } catch (error) {
    // console.log(Object.keys(error));
    // console.log(error.response);
    
    throw new Error
  }
}
