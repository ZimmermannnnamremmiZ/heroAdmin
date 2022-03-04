
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHttp } from '../../hooks/http.hook';
import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    
    const { heroes } = useSelector(state => {
        if (state.activeFilter === 'all') {
            return state.heroes
        } else {
            return state.heroes.filter((el) => {
                return el.element === state.activeFilter
            })
        }
    });
    const { heroesLoadingStatus } = useSelector(state => state)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

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

    const heroesCards = renderHeroesList(heroes);

    return (
        <ul>
            {heroesCards}
        </ul>
    )
}

export default HeroesList;