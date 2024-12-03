import { useState, useEffect } from 'react';
import { questions as QuestionData } from '../data/questions';
import handleSubmit from '../api/index'; // Import the submit function

type Response = { [key: string]: string | number };

export const useQuestionnaire = (questions = QuestionData) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Track responses by question ID
  const [responses, setResponses] = useState<{ [id: number]: Response | null }>(
    questions.reduce((acc, q) => {
      acc[q.id] = q.type === 'slider' ? {} : null; // Initialize slider responses as empty object
      return acc;
    }, {} as { [id: number]: Response | null })
  );

  // Track user inputs (e.g., name, phone)
  const [userInputs, setUserInputs] = useState<{ [key: string]: string }>({});
  const [surveyComplete, setSurveyComplete] = useState(false);

  useEffect(() => {
    if (surveyComplete) {
      const formattedResponses = Object.entries(responses).map(([id, response]) => ({
        id: parseInt(id),
        response,
      }));

      const payload = {
        responses: formattedResponses,
        userInputs,
      };

      // Post the data
      handleSubmit(payload).then(() => {
        // Redirect after submission
        window.location.href = '/Menu';
      });
    }
  }, [surveyComplete, responses, userInputs]);

  const handleSliderChange = (id: number, labelId: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [labelId]: value, // Use labelId (number) as key
      },
    }));
  };

  const handleYesNo = (id: number, response: string) => {
    setResponses((prev) => ({
      ...prev,
      [id]: { answer: response },
    }));
    if (response === 'Yes') {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setSurveyComplete(true); // Trigger completion
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setSurveyComplete(true); // Mark survey as complete
    }
  };

  return {
    responses,
    userInputs,
    currentQuestionIndex,
    surveyComplete,
    handleSliderChange,
    handleYesNo,
    handleInputChange,
    handleNext,
  };
};
