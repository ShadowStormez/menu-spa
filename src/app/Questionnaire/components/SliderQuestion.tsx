import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

type SliderProps = {
  sliders: { label: string; min: number; max: number; step: number }[];
  onChange: (label: string, value: number) => void;
};

const SliderQuestion: React.FC<SliderProps> = ({ sliders, onChange }) => {
  const [localValues, setLocalValues] = useState(
    sliders.reduce((acc, slider) => {
      // Ensure midpoint calculation is consistent
      const midpoint = (slider.min + slider.max) / 2;
      acc[slider.label] = midpoint; // Fallback for empty labels
      return acc;
    }, {} as { [key: string]: number })
  );
  
  

  const handleSliderChange = (label: string, value: number) => {
    setLocalValues((prev) => ({
      ...prev,
      [label]: value,
    }));
    onChange(label, value); // Notify parent of changes
  };

  return (
    <Box>
      {sliders.map((slider) => (
        <Box key={slider.label} sx={{ mb: 3,direction:'rtl' }}>
          <Typography>{slider.label || ''}</Typography>
          <Slider
            value={localValues[slider.label]} // Correctly bound to state
            min={slider.min}
            max={slider.max}
            step={slider.step}
            marks={[
              { value: slider.min, label: slider.min.toString() },
              { value: slider.max, label: slider.max.toString() },
            ]}
            valueLabelDisplay="auto"
            onChange={(_, value) => handleSliderChange(slider.label, value as number)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SliderQuestion;
