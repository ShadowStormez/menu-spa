'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserId, setIsLoggedIn, setUserName } from '../store/authSlice'; // Import redux actions
import { apiSignUp, apiLogin } from '../utils/Users';
import toast from 'react-hot-toast';
import { setShowSignUpModal,setShowLoginModal } from '../store/logSignSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);

  const handleSignUp = async (username: string, mobile: string, password: string) => {
    try {
      const newUser = await apiSignUp(username, mobile, password);
      const loginUser = await apiLogin(mobile, password);
      dispatch(setUserId(newUser.id)); // Dispatch user ID to global state
      dispatch(setUserName(newUser.username));
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      toast.success('حساب کاربری شما با موفقیت ساخته شد');
      dispatch(setShowSignUpModal(false));
      setOpenQuestionnaire(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const handleLogin = async (usernameOrPhone: string, password: string) => {
    try {
      const loginUser = await apiLogin(usernameOrPhone, password);
      dispatch(setUserId(loginUser.id)); // Dispatch user ID to global state
      dispatch(setUserName(loginUser.loginUser.usernameOrMobile));
      dispatch(setIsLoggedIn(true)); // Set isLoggedIn to true
      toast.success('وارد شدید');
      dispatch(setShowLoginModal(false));
      setOpenQuestionnaire(true);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return {
    handleSignUp,
    handleLogin,
    openQuestionnaire,
    setOpenQuestionnaire,
  };
};
