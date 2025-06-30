// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './features/game/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  // No need to add thunk middleware - it's already included
});