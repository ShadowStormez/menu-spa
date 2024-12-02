import React from 'react';
import { TextField } from '@mui/material';

interface TextInputProps {
  fields: string[] | undefined;
  values: { [key: string]: string };
  onChange: (field: string, value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ fields, values, onChange }) => {
  return (
    <>
      {fields?.map((field, index) => (
        <TextField
          key={index}
          fullWidth
          label={field}
          value={values[field] || ''}
          variant="outlined"
          onChange={(e) => onChange(field, e.target.value)}
          sx={{ mb: 2,
           }}
        />
      ))}
    </>
  );
};

export default TextInput;
