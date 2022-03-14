import { configureStore } from '@reduxjs/toolkit';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../reducers/filters';

const store = configureStore({
    reducer: {heroes, filters},
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;