import { configureStore } from '@reduxjs/toolkit';
import cardsReducer from './slice/cardSlice';
import combinationReducer from './slice/combinationSlice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    combinations: combinationReducer,
  },
});

// Infer types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;