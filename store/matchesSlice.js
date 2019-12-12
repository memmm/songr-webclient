import { createSlice } from "@reduxjs/toolkit";

const matchesSlice = createSlice({
  name: "matches",
  initialState: [
    { name: "Zaphod Beeblebrox" },
    { name: "Arthur Dent" },
    { name: "Marvin" }
  ],
  reducers: {
    addMatch: {
      reducer(state, action) {
        //action.payload must be user object
        state.push(action.payload);
      }
    },
    removeMatch: {
      reducer(state, action) {
        //action.payload must be the name of user
        return state.map(match => match.name != action.payload);
      }
    }
  }
});

export const { actions, reducer } = matchesSlice;
export const { addMatch, removeMatch } = matchesSlice;

export default matchesSlice.reducer;
