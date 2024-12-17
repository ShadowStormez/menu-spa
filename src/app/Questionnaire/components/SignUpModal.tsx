import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const SignUpModal = ({ open, onClose, onSignUp, onShowLogin }: { open: boolean, onClose: () => void, onSignUp: (username: string, mobile: string, password: string) => void, onShowLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal open={open} onClose={onClose}>
      <Box 
      sx={{
            display: "flex",
            flexDirection: 'column',
            justifyContent: "center",
            alignItems: "center",
            gap:"30px",
            direction:"rtl",
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
        <Typography variant="h6">ایجاد حساب کاربری</Typography>
        <TextField label="نام کاربری" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
        <TextField label="شماره همراه" value={mobile} onChange={(e) => setMobile(e.target.value)} fullWidth />
        <TextField label="رمز عبور" value={password} onChange={(e) => setPassword(e.target.value)} type="password" fullWidth />
        <Button variant="contained" color="primary" onClick={() => onSignUp(username, mobile, password)}>ثبت نام</Button>
        
        <Box sx={{display:"flex",flexDirection:"row",alignItems:"center",gap:"10px"}}>
        <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
          حساب کاربری دارید؟{' '}
          <Button variant="text" onClick={onShowLogin}>وارد شوید</Button>
        </Typography>
        </Box>

      </Box>
    </Modal>
  );
};

export default SignUpModal;
