import { configureStore } from '@reduxjs/toolkit';
import part1TrainingReducer from "./slices/part1Training";
import loadingReducer from "./slices/loading";

export const store = configureStore({
  reducer: {
    loadingLayout: loadingReducer,
    part1Training: part1TrainingReducer,
  },
});