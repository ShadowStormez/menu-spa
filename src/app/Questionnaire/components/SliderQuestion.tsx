import React, { useState } from 'react';
import { Box, Slider, Typography } from '@mui/material';

type SliderProps = {
  sliders: { labelId: number; label?: string; min: number; max: number; step: number }[];
  onChange: (labelId: number, value: number) => void;
};

const SliderQuestion: React.FC<SliderProps> = ({ sliders, onChange }) => {
  // Ensure all sliders are initialized with midpoint values
  const [localValues, setLocalValues] = useState(() => {
    return sliders.reduce((acc, slider) => {
      acc[slider.labelId] = (slider.min + slider.max) / 2; // Initialize each slider with midpoint
      return acc;
    }, {} as { [key: number]: number });
  });

  const handleSliderChange = (labelId: number, value: number) => {
    setLocalValues((prev) => ({
      ...prev,
      [labelId]: value,
    }));
    onChange(labelId, value); // Notify parent of changes
  };

  return (
    <Box>
      {sliders.map((slider) => (
        <Box key={slider.labelId} sx={{ mb: 3, direction: 'rtl' }}>
          {/* Render label if it exists */}
          {slider.label && <Typography>{slider.label}</Typography>}

          <Slider
            value={localValues[slider.labelId] || slider.min + slider.max / 2} // Use labelId for value tracking
            min={slider.min}
            max={slider.max}
            step={slider.step}
            marks={[
              { value: slider.min, label: slider.min.toString() },
              { value: slider.max, label: slider.max.toString() },
            ]}
            valueLabelDisplay="auto"
            onChange={(_, value) => handleSliderChange(slider.labelId, value as number)}
          />
        </Box>
      ))}
    </Box>
  );
};

export default SliderQuestion;
