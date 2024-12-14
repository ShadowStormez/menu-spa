// slices/globalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  restaurantId: string | null;
  tableId: string | null;
}

const initialState: GlobalState = {
  restaurantId: null,
  tableId: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setRestaurantId: (state, action: PayloadAction<string>) => {
      state.restaurantId = action.payload;
    },
    setTableId: (state, action: PayloadAction<string>) => {
      state.tableId = action.payload;
    },
  },
});

export const { setRestaurantId, setTableId } = globalSlice.actions;
export default globalSlice.reducer;
