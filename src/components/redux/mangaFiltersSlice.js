import { createSlice } from '@reduxjs/toolkit';

const initialFilters = JSON.parse(process.env.REACT_APP_INIT_FILTER);

export const mangaFiltersSlice = createSlice({
    name: 'mangaFilters',
    initialState: {
        filters: initialFilters,
    },
    reducers: {
        categoryChange: (state, action) => {
            state.filters.category = action.payload !== undefined ? action.payload : state.filters.category;
        },
        statusChange: (state, action) => {
            state.filters.status = action.payload !== undefined ? action.payload : state.filters.status;
        },
        sortChange: (state, action) => {
            state.filters.sort = action.payload !== undefined ? action.payload : state.filters.sort;
        },
        resetFilters: (state) => {
            state.filters = initialFilters;
        },
    },
});
