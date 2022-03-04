const initialState = {
    heroes: [],
    filterLoadingStatus: 'idle',
    filters: [],
    filteredHeroList: [],
    filterChanged: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETED':
            const res = state.heroes.filter(el => el.id !== action.payload);
            return {
                ...state,
                heroes: res
            }
        case 'HERO_ADD':
            const newHeroes = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroes
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTERED_BY_ELEMENTS':
            const filteredHeroes = state.heroes.filter((el) => {
                return el.element === action.payload
            })
            return {
                ...state,
                filteredHeroList: filteredHeroes,
            }
        default: return state
    }
}

export default reducer;