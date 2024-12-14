import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the state type, adding name and address
interface GlobalState {
  restaurantId: string | null;
  restaurantName: string | null; // New state for restaurant name
  restaurantAddress: string | null; // New state for restaurant address
  tableId: number | null;
}

const initialState: GlobalState = {
  restaurantId: null,
  restaurantName: null,
  restaurantAddress: null,
  tableId: null,
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setRestaurantId: (state, action: PayloadAction<string>) => {
      state.restaurantId = action.payload;
    },
    setRestaurantName: (state, action: PayloadAction<string>) => {
      state.restaurantName = action.payload;
    },
    setRestaurantAddress: (state, action: PayloadAction<string>) => {
      state.restaurantAddress = action.payload;
    },
    setTableId: (state, action: PayloadAction<number>) => {
      state.tableId = action.payload;
    },
    // Add a single reducer to set all restaurant-related data
    setRestaurantDetails: (
      state,
      action: PayloadAction<{ name: string; address: string }>
    ) => {
      state.restaurantName = action.payload.name;
      state.restaurantAddress = action.payload.address;
    },
  },
});

export const { 
  setRestaurantId, 
  setRestaurantName, 
  setRestaurantAddress, 
  setTableId, 
  setRestaurantDetails 
} = globalSlice.actions;

export default globalSlice.reducer;
