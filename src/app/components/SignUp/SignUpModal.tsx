import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography,InputAdornment,IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignUpModal = ({
  open,
  onClose,
  onSignUp,
  onShowLogin,
}: {
  open: boolean;
  onClose: () => void;
  onSignUp: (username: string, mobile: string, password: string) => void;
  onShowLogin: () => void;
}) => {
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; mobile?: string; password?: string }>({});

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors: { username?: string; mobile?: string; password?: string } = {};

    if (!username.trim()) {
      newErrors.username = 'نام کاربری الزامی است';
    } else if (username.length < 3) {
      newErrors.username = 'نام کاربری باید حداقل ۳ کاراکتر باشد';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'شماره همراه الزامی است';
    } else if (!/^09\d{9}$/.test(mobile)) {
      newErrors.mobile = 'شماره همراه باید با ۰۹ شروع شود و ۱۱ رقم باشد';
    }

    if (!password.trim()) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف و اعداد باشد';
    }
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      onSignUp(username, mobile, password);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          direction: 'rtl',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90vw',
          bgcolor: 'background.paper',
          borderRadius: '8px',
          overflowY: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          p: 3,
          boxShadow: 24,
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h6">ایجاد حساب کاربری</Typography>

        <TextField
          label="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          error={!!errors.username}
          helperText={errors.username}
          placeholder="مثال: Ahoora"
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: 'right',
                direction: 'rtl',
              },
            },
          }}
        />
        <TextField
          label="شماره همراه"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          fullWidth
          error={!!errors.mobile}
          helperText={errors.mobile}
          placeholder="مثال : 09121234567"
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: 'right',
                direction: 'rtl',
              },
            },
          }}
        />
          <TextField
          label="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          error={!!errors.password}
          helperText={errors.password}
          placeholder="مثال : Ahoora1382"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: {
                textAlign: 'right',
                direction: 'rtl',
              },
            },
          }}
        />

        <Button variant="contained" color="primary" onClick={handleSignUp}>
          ثبت نام
        </Button>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            حساب کاربری دارید؟{' '}
            <Typography
            component="span"
            variant="body2"
            onClick={onShowLogin}
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
             >
              وارد شوید
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignUpModal;
