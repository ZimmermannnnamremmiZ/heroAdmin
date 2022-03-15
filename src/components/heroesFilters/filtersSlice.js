import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { useHttp } from '../../hooks/http.hook';

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async() => {
      const { request } = useHttp();
      return await request("http://localhost:3001/filters")
  }
);

const initialState = {
  filterLoadingStatus: 'idle',
  filters: [],
  activeFilter: 'all'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
      //Иммутация за счет Immer

      filterByElement : (state, action) => {
          state.activeFilter = action.payload;
      }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchFilters.pending, state => {state.filterLoadingStatus = 'loading'})
        .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filterLoadingStatus = 'idle'
            state.filters = action.payload;
        })
        .addCase(fetchFilters.rejected, state => {state.filterLoadingStatus = 'error'})
        .addDefaultCase(() => {})
  }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filterByElement
} = actions;