const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: []
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
        case 'FILTERS':
            return {
                filters: action.payload
            }
        default: return state
    }
}

export default reducer;