import axios from 'axios';
import { generateRandomUUID } from './UuidCreator';
import { Preferences } from '../types/user-preferences';

export const apiSubmitAnswers = async (
  userId: string,
  answers: Preferences,
  token: string | null 
) => {
  try {
    const preferences = {
      id: generateRandomUUID(),
      user: { id: userId },
      ...answers,
    };

    const response = await axios.post(
      `http://menyou-svc-gw.darkube.app/api/v1/restaurants/${userId}/user_preferences`,
      preferences,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add token in the Authorization header
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    const err = error as Error;
    throw new Error('Failed to submit preferences: ' + err.message);
  }
};
