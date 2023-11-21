import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from "./slices/loading";
import part1TrainingReducer from "./slices/part1Training";
import part2TrainingReducer from "./slices/part2Training";
import part3TrainingReducer from './slices/part3Training';
import part4TrainingReducer from './slices/part4Training';

export const store = configureStore({
    reducer: {
      loadingLayout: loadingReducer,
      part1Training: part1TrainingReducer,
      part2Training: part2TrainingReducer,
      part3Training: part3TrainingReducer,
      part4Training: part4TrainingReducer,
    },
});