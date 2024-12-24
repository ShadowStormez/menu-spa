import { useState } from 'react';
import { apiSignUp, apiLogin } from '../../utils/Users';
import { apiSubmitAnswers } from '../../utils/preferences';
import toast from 'react-hot-toast';
import { QuestionsArray } from '@/app/types/Questions';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId, setIsLoggedIn, setUserName } from '../../store/authSlice'; // Import redux actions
import { Preference, Preferences } from '../../types/user-preferences';
import { generateRandomUUID } from '@/app/utils/UuidCreator';

// Custom hook for handling the questionnaire
export const useQuestionnaire = (questions: QuestionsArray | null) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: any) => state.auth); // Access global state from Redux

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Preference[]>([]);
  const [surveyComplete,setSurveyComplete] = useState(false);
  const [openQuestionnaire,setOpenQuestionnaire]=useState(false);

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
          _id:generateRandomUUID()
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
          _id:generateRandomUUID()
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
          _id:generateRandomUUID()
        });
      }
      return updatedAnswers;
    });
  };
  const handleSignUp = async (username: string, mobile: string, password: string) => {
    try {
      const newUser = await apiSignUp(username, mobile, password);
      const loginUser = await apiLogin(mobile, password);
      dispatch(setUserId(newUser.id)); // Dispatch user ID to global state
      dispatch(setUserName(newUser.username));
      // localStorage.setItem('userName',newUser.username);
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      toast.success('حساب کاربری شما با موفقیت ساخته شد');
      setOpenQuestionnaire(true);
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
      dispatch(setUserName(loginUser.loginUser.usernameOrMobile));
      // localStorage.setItem('userName',loginUser.loginUser.usernameOrMobile);
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      toast.success('وارد شدید');
      setOpenQuestionnaire(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
      toast.error(error.message);
    }
  }
  };

  const submitAnswers = async () => {
    if (!answers.length) return;
  
    try {
      if (userId) {
        setSurveyComplete(true);
        await apiSubmitAnswers(userId, { preferences: answers });
        window.location.href = '/Menu';
      }
    } catch (error) {
      console.log(error);
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
    handleSignUp,
    handleLogin,
    submitAnswers,
    surveyComplete,
    setOpenQuestionnaire,
    openQuestionnaire
  };
};
