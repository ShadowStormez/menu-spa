import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const LoginModal = ({ open, onClose, onLogin }: { open: boolean, onClose: () => void, onLogin: (usernameOrPhone: string, password: string) => void }) => {
  const [usernameOrPhone, setUsernameOrPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: 300, margin: 'auto', marginTop: 5 }}>
        <Typography variant="h6">ورود به حساب کاربری</Typography>
        <TextField label="نام کاربری یا شماره همراه" value={usernameOrPhone} onChange={(e) => setUsernameOrPhone(e.target.value)} fullWidth />
        <TextField label="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} type="password" fullWidth />
        <Button variant="contained" color="primary" onClick={() => onLogin(usernameOrPhone, password)}>ورود</Button>
      </Box>
    </Modal>
  );
};

export default LoginModal;
