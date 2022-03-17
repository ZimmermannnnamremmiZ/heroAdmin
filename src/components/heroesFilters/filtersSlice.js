import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { useHttp } from '../../hooks/http.hook';

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async() => {
      const { request } = useHttp();
      return await request("http://localhost:3001/filters")
  }
);

const filterAdapter = createEntityAdapter();
const initialState = filterAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
})

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
        .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
        .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filtersLoadingStatus = 'idle'
            filterAdapter.setAll(state, action.payload)
        })
        .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
        .addDefaultCase(() => {})
  }
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { selectAll } = filterAdapter.getSelectors(state => state.filters);

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filterByElement
} = actions;