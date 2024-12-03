'use client'
import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Typography,
  CircularProgress,
  ThemeProvider,
} from '@mui/material';
import { useQuestionnaire } from './hooks/useQuestionnaire';
import SliderQuestion from './components/SliderQuestion';
import TextInput from './components/TextInput';
import theme from '../Theme/theme';
import { questions } from './data/questions'; // Import the data source

const Questionnaire: React.FC = () => {
  const {
    userInputs,
    currentQuestionIndex,
    surveyComplete,
    handleSliderChange,
    handleYesNo,
    handleInputChange,
    handleNext,
  } = useQuestionnaire(questions); // Pass questions as a prop to the hook

  const currentQuestion = questions[currentQuestionIndex]; // Fetch from questions, not responses

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  return (
    <ThemeProvider theme={theme}>
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
        <Typography variant="h6" sx={{ mb: 3 }}>
          <p>
            سلام! ممنون می‌شیم چند دقیقه وقت با ارزش‌تو بزاری و به این سوال‌ها جواب بدی 😊&rlm;
          </p>
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          برای شروع کلیک کن
        </Button>
      </Box>
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={{
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
          }}
        >
          {surveyComplete ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                😃خیلی ممنون
              </Typography>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, direction: 'rtl' }}>
              <Typography variant="h6" sx={{direction:'rtl'}}>{currentQuestion.question}</Typography>

              {currentQuestion.type === 'slider' && currentQuestion.sliders && (
                <SliderQuestion
                  sliders={currentQuestion.sliders}
                  onChange={(labelId, value) => handleSliderChange(currentQuestion.id, labelId, value)}
                />
              )}

              {currentQuestion.type === 'text-input' && (
                <TextInput
                  fields={currentQuestion.inputFields}
                  values={userInputs}
                  onChange={handleInputChange}
                />
              )}

              {currentQuestion.type === 'yes-no' && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', mt: 2 }}>
                  <Button onClick={() => handleYesNo(currentQuestion.id, 'Yes')}>بلی</Button>
                  <Button onClick={() => handleYesNo(currentQuestion.id, 'No')}>خیر</Button>
                </Box>
              )}

              {currentQuestion.type !== 'yes-no' && (
                <Button onClick={handleNext} sx={{ mt: 3, alignSelf: 'center' }}>
                  {currentQuestionIndex < questions.length - 1 ? 'بعدی' : 'ثبت'}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default Questionnaire;
