import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state structure
interface AuthState {
  userId: string | null;
  userName: string | null;
  isLoggedIn: boolean;
}

// Initial state
const initialState: AuthState = {
  userId: null,
  isLoggedIn: false,
  userName: null
};

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
    },
    setUserName: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserId, setIsLoggedIn,setUserName } = authSlice.actions;

export default authSlice.reducer;
