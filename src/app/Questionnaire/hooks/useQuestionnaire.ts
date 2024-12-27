'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiSubmitAnswers } from '../../utils/preferences';
import toast from 'react-hot-toast';
import { generateRandomUUID } from '@/app/utils/UuidCreator';
import { useRouter } from 'next/navigation';
import { QuestionsArray } from '@/app/types/Questions';
import { Preference } from '../../types/user-preferences';

export const useQuestionnaire = (questions: QuestionsArray | null) => {
  const { userId } = useSelector((state: any) => state.auth); // Access global state from Redux
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Preference[]>([]);
  const [surveyComplete, setSurveyComplete] = useState(false);
  const router = useRouter();

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questions?.data?.length ?? 0) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleInputChange = (value: string, questionId: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex((answer) => answer.question.id === questionId);

      if (existingAnswerIndex > -1) {
        updatedAnswers[existingAnswerIndex].answerText = value;
        updatedAnswers[existingAnswerIndex].answerValues = null;
      } else {
        updatedAnswers.push({
          question: { id: questionId },
          answerText: value,
          answerValues: null,
          _id: generateRandomUUID(),
        });
      }
      return updatedAnswers;
    });
  };

  const handleChoice = (value: string, questionId: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex((answer) => answer.question.id === questionId);

      if (existingAnswerIndex > -1) {
        updatedAnswers[existingAnswerIndex].answerText = value;
        updatedAnswers[existingAnswerIndex].answerValues = null;
      } else {
        updatedAnswers.push({
          question: { id: questionId },
          answerText: value,
          answerValues: null,
          _id: generateRandomUUID(),
        });
      }

      if (value.toLowerCase() === "no") {
        submitAnswers();
      }

      return updatedAnswers;
    });
  };

  const handleSliderChange = (sliderId: string, value: number, questionId: string) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex((answer) => answer.question.id === questionId);

      if (existingAnswerIndex > -1) {
        const existingValues = updatedAnswers[existingAnswerIndex].answerValues || [];
        const sliderIndex = existingValues.findIndex((val: { id: string; answerValue: number }) => val.id === sliderId);

        if (sliderIndex > -1) {
          existingValues[sliderIndex].answerValue = value;
        } else {
          existingValues.push({ id: sliderId, answerValue: value });
        }

        updatedAnswers[existingAnswerIndex].answerValues = existingValues;
        updatedAnswers[existingAnswerIndex].answerText = null;
      } else {
        updatedAnswers.push({
          question: { id: questionId },
          answerValues: [{ id: sliderId, answerValue: value }],
          answerText: null,
          _id: generateRandomUUID(),
        });
      }
      return updatedAnswers;
    });
  };

  const submitAnswers = async () => {
    if (!answers.length) return;

    try {
      if (userId) {
        setSurveyComplete(true);
        await apiSubmitAnswers(userId, { preferences: answers });
        router.push('/Menu');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit answers.');
    }
  };

  return {
    currentQuestionIndex,
    answers,
    handleNextQuestion,
    handlePrevQuestion,
    handleInputChange,
    handleChoice,
    handleSliderChange,
    submitAnswers,
    surveyComplete,
  };
};
