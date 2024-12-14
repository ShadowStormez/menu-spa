import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


interface CartItem {
  id: string;
  name: string;
  price: number;
  number: number;
  images: string[] // Allow string or StaticImageData
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.number += 1;
        toast.success(`${name} به سفارش های شما اضافه شد`);
      } else {
        state.items.push({ ...action.payload, number: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    incrementNumber: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.number += 1;
      }
    },
    decrementNumber: (state, action: PayloadAction<string>) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item && item.number > 1) {
        item.number -= 1;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, incrementNumber, decrementNumber, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
