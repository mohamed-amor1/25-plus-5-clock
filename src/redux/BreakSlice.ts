import { createSlice } from "@reduxjs/toolkit";

export interface BreakState {
  breakMinutes: number;
  breakSeconds: number;
}

const initialState: BreakState = {
  breakMinutes: 5,
  breakSeconds: 0,
};

export const BreakSlice = createSlice({
  name: "break",
  initialState,
  reducers: {
    increment: (state): void => {
      state.breakMinutes += 1;
    },
    decrement: (state): void => {
      if (state.breakMinutes > 1) {
        // Check if it's greater than 1 before decrementing
        state.breakMinutes -= 1;
      }
    },
  },
});

export const { increment, decrement } = BreakSlice.actions;

export default BreakSlice.reducer;
