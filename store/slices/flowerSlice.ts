import { Flower } from "@/types/flowers";
import { createSlice } from "@reduxjs/toolkit";
import { setAllFlowers } from "../asyncThunk/flowers.thunk";

type State = {
  flowers: Flower[];
  isLoading: boolean;
  error: null | string;
};

const initialState: State = {
  flowers: [],
  isLoading: false,
  error: null,
};

const flowerSlice = createSlice({
  name: "flowers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setAllFlowers.fulfilled, (state, action) => {
        state.flowers = action.payload;
        state.isLoading = false;
      })
      .addCase(setAllFlowers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAllFlowers.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.isLoading = false;
      });
  },
});

export default flowerSlice.reducer;
