// store/categorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: { activeCategory: 'all' },
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
});

export const { setActiveCategory } = categorySlice.actions;
export default categorySlice.reducer;
