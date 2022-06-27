import { createSlice } from '@reduxjs/toolkit';

export const mangaFiltersSlice = createSlice({
    name: 'mangaFilters',
    initialState: {
        filters: {
            category: '',
            status: '-1',
            sort: '0',
        },
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
    },
});
