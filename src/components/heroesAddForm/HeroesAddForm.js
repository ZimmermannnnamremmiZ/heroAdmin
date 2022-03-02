import React, {useState, useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';

import {useHttp} from '../../hooks/http.hook';
import {useDispatch} from 'react-redux';
import {heroAdd, filters} from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров


const HeroesAddForm = () => {

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')
    const [filters, setFilters] = useState('')

    const {request} = useHttp();
    const dispatch = useDispatch();

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
                    <option>Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;