import { createSlice } from "@reduxjs/toolkit";

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

      filtersFetching: state => {
          state.filterLoadingStatus = 'loading'
      },
      filtersFetched: (state, action) => {
          state.filterLoadingStatus = 'idle';
          state.filters = action.payload;
      },
      filtersFetchingError: state => {
          state.filterLoadingStatus = 'error';
      },
      filterByElement : (state, action) => {
          state.activeFilter = action.payload;
      },
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