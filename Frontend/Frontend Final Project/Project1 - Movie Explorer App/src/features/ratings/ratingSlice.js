import { createSlice } from "@reduxjs/toolkit";

const ratingSlice = createSlice({
  name: "ratings",
  initialState: {},
  reducers: {
    rateMovie: (state, action) => {
      const { movieId, rating } = action.payload;
      state[movieId] = rating;
    },
  },
});

export const { rateMovie } = ratingSlice.actions;
export default ratingSlice.reducer;
