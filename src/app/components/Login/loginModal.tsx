import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography,InputAdornment,IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const LoginModal = ({
  open,
  onClose,
  onLogin,
  onShowSignUp,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: (usernameOrPhone: string, password: string) => void;
  onShowSignUp: () => void;
}) => {
  const [usernameOrPhone, setUsernameOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ usernameOrPhone?: string; password?: string }>({});

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors: { usernameOrPhone?: string; password?: string } = {};

    // Validate username or phone
    if (!usernameOrPhone.trim()) {
      newErrors.usernameOrPhone = 'نام کاربری یا شماره همراه الزامی است';
    } else if (/^\d+$/.test(usernameOrPhone)) {
      // The input contains only digits, so validate as a phone number
      if (!/^09\d{9}$/.test(usernameOrPhone)) {
        newErrors.usernameOrPhone = 'شماره همراه باید با ۰۹ شروع شود و ۱۱ رقم باشد';
      }
    } else {
      // The input is not all digits, so validate as a username
      if (!/^[A-Za-z][A-Za-z\d_]{2,}$/.test(usernameOrPhone)) {
        newErrors.usernameOrPhone = 'نام کاربری باید با حرف شروع شود و حداقل ۳ کاراکتر باشد';
      }
    }
    

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد و شامل حروف و اعداد باشد';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      onLogin(usernameOrPhone, password);
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
        <Typography variant="h6">ورود به حساب کاربری</Typography>

        <TextField
          label="نام کاربری یا شماره همراه"
          value={usernameOrPhone}
          onChange={(e) => setUsernameOrPhone(e.target.value)}
          fullWidth
          error={!!errors.usernameOrPhone}
          helperText={errors.usernameOrPhone}
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
              sx: {
                textAlign: 'right',
                direction: 'rtl',
              },
            },
          }}
        />

        <Button variant="contained" color="primary" onClick={handleLogin}>
          ورود
        </Button>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
            حساب کاربری ندارید؟{' '}
            <Typography
              component="span"
              variant="body2"
              onClick={onShowSignUp}
              sx={{
                fontWeight: 'bold',
                color: 'primary.main',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              ثبت نام
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginModal;
