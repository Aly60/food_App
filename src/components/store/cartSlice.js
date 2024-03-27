import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import axios from "axios";

//const BaseUrl = "http://localhost:3001/cart";

const getItemFromLocalStorage = (key) => {
  try {
    const storedCart = localStorage.getItem(key);
    return JSON.parse(storedCart);
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
};

const saveLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

const totalCartAmount = (items) => {
  if (!Array.isArray(items)) {
    return 0;
  }
  return items.reduce((total, item) => total + item.totalPrice, 0);
};
const initialState = {
  items: getItemFromLocalStorage("cart") || [],
  totalQuantity: getItemFromLocalStorage("totalQuantity") || 0,
  totalAmount: totalCartAmount(getItemFromLocalStorage("cart") || 0),
  error: "",
};
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await fetch("http://localhost:3001/cart");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      state.totalAmount = totalCartAmount(state.items);

      saveLocalStorage("cart", state.items);
      saveLocalStorage("totalQuantity", state.totalQuantity);
      saveLocalStorage("totalAmount", state.totalAmount);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (!existingItem) {
        return;
      }

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalQuantity = state.totalQuantity - 1;

      state.totalAmount = totalCartAmount(state.items);

      saveLocalStorage("cart", state.items);
      saveLocalStorage("totalQuantity", state.totalQuantity);
      saveLocalStorage("totalAmount", state.totalAmount);
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveLocalStorage("cart", []);
      saveLocalStorage("totalQuantity", 0);
      saveLocalStorage("totalAmount", 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
