import { configureStore } from '@reduxjs/toolkit';
import part1TrainingReducer from "./slices/part1Training";
import loadingReducer from "./slices/loading";
import part2TrainingReducer from "./slices/part2Training";
import part3TrainingReducer from './slices/part3Training';

export const store = configureStore({
    reducer: {
      loadingLayout: loadingReducer,
      part1Training: part1TrainingReducer,
      part2Training: part2TrainingReducer,
      part3Training: part3TrainingReducer
    },
});