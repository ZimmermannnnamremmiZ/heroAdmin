import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { heroAdd } from '../heroesList/heroesSlice';
import { fetchFilter } from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesAddForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')

    const {filters, filterLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchFilter(request));
        // eslint-disable-next-line
    }, []);

    if (filterLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filterLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderOptionsList = (arr) => {
        
        if (arr.length === 0) {
            return <option>Нет элементов</option>
        }

        return arr.map((el) => {
            if (el.name === 'all') return;
            return (
                <option key={uuidv4()} value={el.name}>{el.lable}</option>
            )
        })
    }

    const onSubmitHandler = (event) => {
        event.preventDefault()

        const newHero = {
            id: uuidv4(),
            name,
            description,
            element
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(data => dispatch(heroAdd(data)))

        setName('')
        setDescription('')
        setElement('')
    }

    const elements = renderOptionsList(filters);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name"
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={el => setName(el.target.value)}
                    value={name}/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="description" 
                    className="form-control" 
                    id="description" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={el => setDescription(el.target.value)}
                    value={description}/>
            </div>
            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element"
                    name="element"
                    onChange={el => setElement(el.target.value)}
                    value={element}
                >
                    <option value="" disabled selected hidden>Я владею элементом...</option>
                    {elements}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;