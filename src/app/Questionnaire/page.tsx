'use client'
import React, { useState } from 'react';
import { Box, Button, TextField, Slider, Typography, LinearProgress } from '@mui/material';
import useAllQuestions from '../utils/getQuestions'; // Custom hook for fetching questions
import SignUpModal from './components/SignUpModal'; // Sign-up modal component
import LoginModal from './components/loginModal'; // Login modal component
import { useQuestionnaire } from './hooks/useQuestionnaire'; // Custom hook for questionnaire logic
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 

const QuestionnairePage = () => {
  const { questions, loading, error } = useAllQuestions(); // Fetch all questions
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const restaurantId = useSelector((state: RootState) => state.global.restaurantId);

  // Using the custom hook
  const {
    currentQuestionIndex,
    answers,
    handleNextQuestion,
    handleInputChange,
    handleChoice, // Added handleChoice here
    handleSignUp,
    handleLogin,
    submitAnswers,
  } = useQuestionnaire(questions,restaurantId);

  // Conditional rendering based on loading or error states
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleStartQuestionnaire = () => {
    setShowSignUpModal(true); // Trigger sign-up modal
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center">سلام! ممنون می‌شیم چند دقیقه وقت با ارزش‌تو بزاری و به این سوال‌ها جواب بدی 😊&rlm;</Typography>
      
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartQuestionnaire}
        >
          شروع پرسش‌نامه
        </Button>
      </Box>
      {isLoggedIn ? (
        <>
          {questions?.map((question, index) => (
            <Box key={question.questionId} sx={{ marginBottom: 2 }}>
              {question.type === 'text-input' && (
                <TextField
                  label={question.questionText}
                  fullWidth
                  onChange={(e) => handleInputChange(e.target.value, question.questionId)}
                />
              )}

              {question.type === 'slider' && question.sliders?.map((slider, idx) => (
                <Box key={idx} sx={{ paddingBottom: 2 }}>
                  <Typography>{slider.label}</Typography>
                  <Slider
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    valueLabelDisplay="auto"
                    onChange={(e, value) => handleInputChange(value, question.questionId)}
                  />
                </Box>
              ))}

              {question.type === 'choice' && (
                <Box>
                  <Button variant="outlined" onClick={() => handleChoice(true, question.questionId)}>
                    بله
                  </Button>
                  <Button variant="outlined" onClick={() => handleChoice(false, question.questionId)}>
                    خیر
                  </Button>
                </Box>
              )}
            </Box>
          ))}

          <Button variant="contained" color="primary" onClick={handleNextQuestion}>
            {currentQuestionIndex === (questions?.length ?? 0) - 1 ? 'ارسال' : 'بعدی'}
          </Button>
        </>
      ) : (
        <>
          {/* Show Sign-Up Modal */}
          <SignUpModal
            open={showSignUpModal}
            onClose={() => setShowSignUpModal(false)}
            onSignUp={handleSignUp}
            onShowLogin={() => setShowLoginModal(true)}
          />

          {/* Show Login Modal */}
          <LoginModal
            open={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        </>
      )}
    </Box>
  );
};

export default QuestionnairePage;
