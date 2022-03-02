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

export const filters = (filters) => {
    return {
        type: 'FILTERS',
        payload: filters
    }
}