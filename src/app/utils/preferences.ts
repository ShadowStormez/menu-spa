import axios from 'axios';
import {generateRandomUUID} from './UuidCreator'
import { Preferences } from '../types/user-preferences';

export const apiSubmitAnswers = async (userId: string, answers: Preferences) => {
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
        withCredentials: true,
      }
    );

    console.log('Preferences submitted successfully:', response.data);

    return response.data;
  } catch (error) {
    const err = error as Error;
    throw new Error('Failed to submit preferences: ' + err.message);
  }
};



