import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backdrop: "",
  poster: "",
  profile: "",
};
const urlSlice = createSlice({
  name: "urlSlice",
  initialState,

  reducers: {
    setUrl: (state, action) => {
      state.profile = action.payload?.profile;
      state.poster = action.payload?.poster;
      state.backdrop = action.payload?.backdrop;
    },
  },
});

export const { setUrl } = urlSlice.actions;
export default urlSlice.reducer;
