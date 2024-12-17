'use client'
import React, { useState } from 'react';
import { Box, Button, TextField, Slider, Typography, LinearProgress, CircularProgress, ThemeProvider } from '@mui/material';
import useAllQuestions from '../utils/getQuestions'; // Custom hook for fetching questions
import SignUpModal from './components/SignUpModal'; // Sign-up modal component
import LoginModal from './components/loginModal'; // Login modal component
import { useQuestionnaire } from './hooks/useQuestionnaire'; // Custom hook for questionnaire logic
import { useSelector } from 'react-redux';
import { RootState } from '../store'; 
import theme from '../Theme/theme';

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
    handleChoice,
    handleSignUp,
    handleLogin,
    submitAnswers,
    surveyComplete
  } = useQuestionnaire(questions, restaurantId);

  // Conditional rendering based on loading or error states
  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  const handleStartQuestionnaire = () => {
    setShowSignUpModal(true); // Trigger sign-up modal
  };

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
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>سلام! ممنون می‌شیم چند دقیقه وقت با ارزش‌تو بزاری و به این سوال‌ها جواب بدی 😊&rlm;</Typography>
          <Button
            variant="contained"
            onClick={handleStartQuestionnaire}
          >
            برای شروع کلیک کن!
          </Button>
        </Box>

        {isLoggedIn ? (
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
                  😃خیلی ممنون
                </Typography>
                <CircularProgress />
              </Box>
            ) : (
              <>
                {questions?.map((question, index) => (
                  <Box key={question.questionId}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2, direction: 'rtl' }}>
                    <Typography variant="h6" sx={{ direction: 'rtl' }}>{question.questionText}</Typography>
                    {question.type === 'text-input' && (
                      <TextField
                        label={question.questionText}
                        fullWidth
                        onChange={(e) => handleInputChange(e.target.value, question.questionId)}
                        variant="outlined"
                        sx={{ mb: 2 }}
                      />
                    )}

                    {question.type === 'slider' && question.sliders?.map((slider, idx) => (
                      <Box key={idx} sx={{ mb: 3, direction: 'rtl' }}>
                        <Typography>{slider.label}</Typography>
                        <Slider
                          min={slider.min}
                          max={slider.max}
                          step={slider.step}
                          marks={[
                            { value: slider.min, label: slider.min.toString() },
                            { value: slider.max, label: slider.max.toString() },
                          ]}
                          valueLabelDisplay="auto"
                          onChange={(e, value) => handleInputChange(value, question.questionId)}
                        />
                      </Box>
                    ))}

                    {question.type === 'choice' && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 2 }}>
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
                <Button sx={{ mt: 3, alignSelf: 'center' }} onClick={handleNextQuestion}>
                  {currentQuestionIndex === (questions?.length ?? 0) - 1 ? 'ثبت' : 'بعدی'}
                </Button>
              </>
            )}
          </Box>
        ) : (
          <>
            <SignUpModal
              open={showSignUpModal}
              onClose={() => setShowSignUpModal(false)}
              onSignUp={handleSignUp}
              onShowLogin={() => {
                setShowLoginModal(true)
                setShowSignUpModal(false)
              }}
            />

            <LoginModal
              open={showLoginModal}
              onClose={() => setShowLoginModal(false)}
              onLogin={handleLogin}
              onShowSignUp={() => {
                setShowLoginModal(false)
                setShowSignUpModal(true)
              }}
            />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default QuestionnairePage;
