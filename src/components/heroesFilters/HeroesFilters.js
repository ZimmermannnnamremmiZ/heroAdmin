import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { filterByElement, filterFetching, filterFetched, filterFetchingError } from '../../actions';
import Spinner from '../spinner/Spinner';



const HeroesFilters = () => {
    const {filters, filterLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(filterFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filterFetched(data)))
            .catch(() => dispatch(filterFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filterLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filterLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderButtonsList = (arr) => {
        
        if (arr.length === 0) {
            return <div>Ошибка загрузки элементов</div>
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