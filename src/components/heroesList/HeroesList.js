
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const {
        data: heroes = [],
        isLoading,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);

    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();

        if (activeFilter === 'all') {
            return heroes;
        } else {
            return filteredHeroes.filter((el) => el.element === activeFilter);
        }
    }, [heroes, activeFilter])

    const onDelete = useCallback((id) => {
        deleteHero(id)
    }, [])

    if (isLoading) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return  <TransitionGroup>
                    {arr.map(({id,  ...props}) => {
                        return <CSSTransition
                                    key={id}
                                    timeout={300}
                                    classNames="item">
                                    <HeroesListItem key={id}
                                        {...props}
                                        onDelete={() => onDelete(id)}/>
                                </CSSTransition>
                    })}
                </TransitionGroup>
    }

    const heroesCards = renderHeroesList(filteredHeroes);

    return (
        <ul>
            {heroesCards}
        </ul>
    )
}

export default HeroesList;