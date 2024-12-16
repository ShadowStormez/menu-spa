import { useState, useEffect } from 'react';
import axios from 'axios';
import { QuestionsArray } from '../types/Questions';

export default function useAllQuestions() {
  const [questions, setQuestions] = useState<QuestionsArray | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get('https://menyou-svc-gw.darkube.app/api/v1/restaurants/question/all_questions');
        setQuestions(response.data); // Assume the response.data is of type Question[]
      } catch (error) {
        console.error('Error fetching question data:', error);
        setError('Failed to fetch questions');
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuestions();
  }, []); // Empty dependency array, so it runs once when the component mounts

  return { questions, loading, error };
}
