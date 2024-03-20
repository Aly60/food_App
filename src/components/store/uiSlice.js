import { createSlice } from "@reduxjs/toolkit";
import { cartActions } from "./cartSlice";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartIsVisible: false,
    isOrderConfirm: false,
  },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
    setOrderConfirm(state, action) {
      state.isOrderConfirm = action.payload;
      /*  if (!action.payload) {
        console.log("Clearing the cart...");

      }*/
      cartActions.clearCart();
    },
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice;
