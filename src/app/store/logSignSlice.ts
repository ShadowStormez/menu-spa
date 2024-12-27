import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSignUpModal: false,
  showLoginModal: false,
};

const logSignSlice = createSlice({
  name: 'logSign',
  initialState,
  reducers: {
    setShowSignUpModal: (state, action) => {
      state.showSignUpModal = action.payload; // Accepts true or false
    },
    setShowLoginModal: (state, action) => {
      state.showLoginModal = action.payload; // Accepts true or false
    },
  },
});

export const { setShowSignUpModal, setShowLoginModal } = logSignSlice.actions;

export default logSignSlice.reducer;
