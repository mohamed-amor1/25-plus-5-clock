import { createSlice } from "@reduxjs/toolkit";

export interface SessionState {
  sessionMinutes: number;
  sessionSeconds: number;
}

const initialState: SessionState = {
  sessionMinutes: 25,
  sessionSeconds: 0,
};

export const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    increment: (state): void => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.sessionMinutes += 1;
    },
    decrement: (state) => {
      if (state.sessionMinutes > 1) {
        state.sessionMinutes -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = SessionSlice.actions;

export default SessionSlice.reducer;
