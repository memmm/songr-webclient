import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    addUser: {
      reducer(state, action) {
        state = action.payload;
      }
    },
    removeUser: {
      reducer(state, action) {
        return {};
      }
    }
  }
});

export const { actions, reducer } = userSlice;
export const { addUser, removeUser } = actions;

export default userSlice.reducer;
