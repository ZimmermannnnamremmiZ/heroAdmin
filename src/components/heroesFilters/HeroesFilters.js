import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { fetchFilters, filterByElement, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';
import store from '../../store';

import './heroesFilters.scss';

const HeroesFilters = () => {
    const { filterLoadingStatus } = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))
        // eslint-disable-next-line
    }, []);

    if (filterLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filterLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderButtonsList = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map((el) => {
            return (
                <button onClick={() => onFilter(el.name)} className={el.classNames} key={uuidv4()}>
                    {el.lable}
                </button>
            )
        })
    }

    const onFilter = (item) => {
        dispatch(filterByElement(item));
    }

    const elements = renderButtonsList(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;