import { configureStore } from '@reduxjs/toolkit';
import { mangaFiltersSlice } from './mangaFiltersSlice';

export const store = configureStore({
    reducer: {
        mangaFilters: mangaFiltersSlice.reducer,
    },
});
