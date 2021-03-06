
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import { fetchHeroes, heroDeleted, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {

    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes())
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
                .then(dispatch(heroDeleted(id)))
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return  <TransitionGroup component={null}>
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