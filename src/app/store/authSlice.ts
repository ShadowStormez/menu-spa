import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state structure
interface AuthState {
  userId: string | null;
  isLoggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  userId: null,
  isLoggedIn: false,
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserId, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
