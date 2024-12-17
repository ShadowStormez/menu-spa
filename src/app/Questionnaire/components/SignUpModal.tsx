import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const SignUpModal = ({ open, onClose, onSignUp, onShowLogin }: { open: boolean, onClose: () => void, onSignUp: (username: string, mobile: string, password: string) => void, onShowLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: 300, margin: 'auto', marginTop: 5 }}>
        <Typography variant="h6">ایجاد حساب کاربری</Typography>
        <TextField label="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField label="شماره همراه" value={mobile} onChange={(e) => setMobile(e.target.value)} fullWidth />
        <TextField label="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} type="password" fullWidth />
        <Button variant="contained" color="primary" onClick={() => onSignUp(username, mobile, password)}>ثبت نام</Button>
        
        {/* Link to switch to login */}
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Button variant="text" onClick={onShowLogin}>وارد شوید</Button>
        </Typography>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
