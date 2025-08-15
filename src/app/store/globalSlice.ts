import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RestaurantDetails {
  name?: string;
  address?: string;
}

interface GlobalState {
  restaurantDetails: RestaurantDetails;
}

const initialState: GlobalState = {
  restaurantDetails: {}
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setRestaurantDetails: (state, action: PayloadAction<RestaurantDetails>) => {
      state.restaurantDetails = {
        ...state.restaurantDetails,
        ...action.payload
      };
    },
  },
});

export const { setRestaurantDetails } = globalSlice.actions;
export default globalSlice.reducer;