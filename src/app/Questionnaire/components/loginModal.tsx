import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const LoginModal = ({ open, onClose, onLogin }: { open: boolean, onClose: () => void, onLogin: (usernameOrPhone: string, password: string) => void }) => {
  const [usernameOrPhone, setUsernameOrPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
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
        <Typography variant="h6">ورود به حساب کاربری</Typography>
        <TextField label="نام کاربری یا شماره همراه" value={usernameOrPhone} onChange={(e) => setUsernameOrPhone(e.target.value)} fullWidth />
        <TextField label="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} type="password" fullWidth />
        <Button variant="contained" color="primary" onClick={() => onLogin(usernameOrPhone, password)}>ورود</Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
