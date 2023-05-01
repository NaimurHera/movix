import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import urlSlice from "../features/homeslice/urlSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    url: urlSlice,
  },
  middleware: (getDefaultMiddlewars) =>
    getDefaultMiddlewars().concat(apiSlice.middleware),
});
