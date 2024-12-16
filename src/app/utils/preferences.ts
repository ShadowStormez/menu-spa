import axios from 'axios';

export const apiSubmitAnswers = async (restaurantId:string | null,userId: string, answers: any[]) => {
  try {
    const preferences = {
      id: {restaurantId}, // Replace with dynamic restaurant ID
      user: { id: userId },
      preferences: answers,
    };
    await axios.post(`https://menyou-svc-gw.darkube.app/api/v1/restaurants/${userId}/user_preferences`, preferences);
    return preferences; // Optional: return the saved preferences
  } catch (error) {
    throw new Error('Failed to submit preferences');
  }
};
