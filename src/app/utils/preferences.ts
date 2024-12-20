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
    await axios.post(`http://menyou-svc-gw.darkube.app/api/v1/restaurants/${userId}/user_preferences`, preferences);
    return preferences; // Optional: return the saved preferences
  } catch (error) {
    throw new Error('Failed to submit preferences');
  }
};

