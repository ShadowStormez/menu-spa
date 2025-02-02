'use client';
import React, { useState,useRef,useEffect } from 'react';
import { Box, Button, TextField, Slider, Typography, LinearProgress, CircularProgress, ThemeProvider,Modal } from '@mui/material';
import useAllQuestions from '../utils/getQuestions'; // Custom hook for fetching questions
import SignUpModal from '../components/SignUp/SignUpModal'; // Sign-up modal component
import LoginModal from '../components/Login/loginModal'; // Login modal component
import { useQuestionnaire } from './hooks/useQuestionnaire'; // Custom hook for questionnaire logic
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'; 
import { setShowSignUpModal, setShowLoginModal } from '../store/logSignSlice';
import theme from '../Theme/theme';

import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

const QuestionnairePage = () => {
  const { questions, loading, error } = useAllQuestions(); // Fetch all questions
  const dispatch = useDispatch();
  const { showSignUpModal, showLoginModal } = useSelector((state: any) => state.logSign);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // Using the custom hook
  const {
    currentQuestionIndex,
    answers,
    handleNextQuestion,
    handlePrevQuestion,
    handleInputChange,
    handleChoice,
    handleSliderChange,
    submitAnswers,
    surveyComplete,
  } = useQuestionnaire(questions);
  const {
    handleLogin,
    handleSignUp,
    openQuestionnaire,
    setOpenQuestionnaire
  } = useAuth();

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleStartQuestionnaire = () => {
    if(!isLoggedIn){
      dispatch(setShowSignUpModal(true));
    }
    if(isLoggedIn){
      setOpenQuestionnaire(true);
    } 
  };

  const handleNoQuestionnaire=() => {
    router.push('/Menu');
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          margin: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '9px 9px 25px -3px rgba(0,0,0,0.75)',
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          background: '#fff'
        }}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>سلام! ممنون می‌شیم چند دقیقه وقت باارزشتو بزاری و به این سوال‌ها جواب بدی 😊&rlm;</Typography>
          <Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:'10px'}}>
          <Button
            variant="contained"
            onClick={handleStartQuestionnaire}
          >
            برای شروع کلیک کن
          </Button>
          <Button
            variant="skip"
            onClick={handleNoQuestionnaire}
          >
            نه ممنون
          </Button>
          </Box>
        </Box>

        {isLoggedIn ? (
            <Modal
            open={openQuestionnaire}
            onClose={() => setOpenQuestionnaire(false)}
            >
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            bgcolor: "background.paper",
            borderRadius: "8px",
            overflowY: "auto",
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            p: 3,
            boxShadow: 24,
            maxHeight: "80vh",
          }}>
            {surveyComplete ? (
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 3 }}>
                  😃بسی متشکریم
                </Typography>
                <CircularProgress />
              </Box>
            ) : (
              <>
{questions?.data && questions?.data[currentQuestionIndex] && (
  <Box
    key={questions.data[currentQuestionIndex]._id}
    sx={{ display: 'flex', flexDirection: 'column', gap: 2, direction: 'rtl' }}
  >
    <Typography variant="h6" sx={{ direction: 'rtl' }}>
      {questions.data[currentQuestionIndex].questionText}
    </Typography>
    
    {(questions.data[currentQuestionIndex].type === 'text' || questions.data[currentQuestionIndex].type === 'text-input') && (
  <TextField
    placeholder={questions.data[currentQuestionIndex].placeholder}
    fullWidth
    onChange={(e) =>
      handleInputChange(e.target.value, questions.data[currentQuestionIndex]._id)
    }
    variant="outlined"
    sx={{ mb: 2 }}
  />
)}

    
    {questions.data[currentQuestionIndex].type === 'slider' &&
      questions.data[currentQuestionIndex].sliders?.map((slider, idx) => (
        <Box key={idx} sx={{ mb: 3, direction: 'rtl' }}>
          <div className="slider-label" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'start',
            gap:'5px'
          }}>
          <Typography>{slider.label}</Typography>
          <Typography sx={{fontSize:'14px', color:'gray'}}>{slider.scale}</Typography>
          </div>
          <Slider
            min={slider.min}
            max={slider.max}
            step={slider.step}
            defaultValue={(slider.min + slider.max)/2}
            marks={[
              { value: slider.min, label: slider.min.toString() },
              { value: slider.max, label: slider.max.toString() },
            ]}
            valueLabelDisplay="auto"
            onChange={(e, value) => {
              if (typeof value === 'number') {
                handleSliderChange(slider.id, value, questions.data[currentQuestionIndex]._id);
              } else {
                console.error('Expected value to be a number, but received an array:', value);
              }
            }}
          />
        </Box>
      ))}

    {questions.data[currentQuestionIndex].type === 'choice' && (
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => handleChoice('yes', questions.data[currentQuestionIndex]._id)}
        >
          بله
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleChoice('no', questions.data[currentQuestionIndex]._id)}
        >
          خیر
        </Button>
      </Box>
    )}
  </Box>
)}
{
questions?.data[currentQuestionIndex].type === 'choice'? null : (
<Box sx={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',gap:'10px'}}>
{currentQuestionIndex > 0 && (
  <Button
    sx={{ mt: 3, alignSelf: 'center' }}
    onClick={handlePrevQuestion}
  >
    قبلی
  </Button>
)}
  <Button
  sx={{ mt: 3, alignSelf: 'center' }}
  onClick={handleNextQuestion}
  >
  {currentQuestionIndex === (questions?.data?.length ?? 0) - 1 ? 'ثبت' : 'بعدی'}
  </Button>
</Box>
)
}


              </>
            )}
          </Box>
          </Modal>
        ) : (
          <>
            <SignUpModal
              open={showSignUpModal}
              onClose={() => dispatch(setShowSignUpModal(false))}
              onSignUp={handleSignUp}
              onShowLogin={() => {
                dispatch(setShowSignUpModal(false));
                dispatch(setShowLoginModal(true));
              }}
            />

            <LoginModal
              open={showLoginModal}
              onClose={() => dispatch(setShowLoginModal(false))}
              onLogin={handleLogin}
              onShowSignUp={() => {
                dispatch(setShowLoginModal(false));
                dispatch(setShowSignUpModal(true));
              }}
            />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default QuestionnairePage;
