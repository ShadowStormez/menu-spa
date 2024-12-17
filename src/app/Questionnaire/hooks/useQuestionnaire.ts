import { useState } from 'react';
import { apiSignUp, apiLogin } from '../../utils/Users';
import { apiSubmitAnswers } from '../../utils/preferences';
import toast from 'react-hot-toast';
import { QuestionsArray } from '@/app/types/Questions';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, setIsLoggedIn } from '../../store/authSlice'; // Import redux actions

// Custom hook for handling the questionnaire
export const useQuestionnaire = (questions: QuestionsArray | null,restaurantId:string | null) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: any) => state.auth); // Access global state from Redux

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (questions?.length ?? 0) - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const handleInputChange = (value: any, questionId: string) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(answer => answer.questionId === questionId);
      if (existingAnswerIndex > -1) {
        updatedAnswers[existingAnswerIndex].value = value;
      } else {
        updatedAnswers.push({ questionId, value });
      }
      return updatedAnswers;
    });
  };

  const handleChoice = (value: boolean, questionId: string) => {
    setAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      const existingAnswerIndex = updatedAnswers.findIndex(answer => answer.questionId === questionId);
      if (existingAnswerIndex > -1) {
        updatedAnswers[existingAnswerIndex].value = value;
      } else {
        updatedAnswers.push({ questionId, value });
      }
      return updatedAnswers;
    });

    // Optionally move to the next question or submit based on the choice
    if (value) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Yes
    } else {
      submitAnswers(); // No, submit answers immediately
    }
  };

  const handleSignUp = async (username: string, mobile: string, password: string) => {
    try {
      const newUser = await apiSignUp(username, mobile, password);
      dispatch(setUserId(newUser.id)); // Dispatch user ID to global state
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      toast.success('حساب کاربری شما با موفقیت ساخته شد!');
    } catch (error: unknown) {
      if (error instanceof Error) {
      toast.error(error.message);
    }
  }
  };

  const handleLogin = async (usernameOrPhone: string, password: string) => {
    try {
      // Calling apiLogin and extracting the loginUser object, which contains the 'id'
      const loginUser = await apiLogin(usernameOrPhone, password);
      dispatch(setUserId(loginUser.id)); // Dispatch user ID to global state
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      toast.success('وارد شدید!');
    } catch (error: unknown) {
      if (error instanceof Error) {
      toast.error(error.message);
    }
  }
  };

  const submitAnswers = () => {
    if (!answers.length) return;

    try {
      if (userId) {
        apiSubmitAnswers(restaurantId,userId, answers); // Use global userId
        toast.success('Answers submitted!');
      }
    } catch (error) {
      toast.error('Error submitting answers');
    }
  };

  return {
    currentQuestionIndex,
    answers,
    handleNextQuestion,
    handleInputChange,
    handleChoice, 
    handleSignUp,
    handleLogin,
    submitAnswers,
  };
};
