export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

export const heroAdd = (hero) => {
    return {
        type: 'HERO_ADD',
        payload: hero
    }
}

export const fetchFilter = (request) => (dispatch) => {
    dispatch(filterFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filterFetched(data)))
        .catch(() => dispatch(filterFetchingError()))
}

export const filterFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filterFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filterFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filterByElement = (filter) => {
    return {
        type: 'FILTER_ACTIVE',
        payload: filter
    }
}