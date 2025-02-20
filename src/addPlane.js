import './addPlane.css'
import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { userContext } from './index.js'
import { add_plane } from './http/plane_queries.js'

const App = observer(() => {
    const context = useContext(userContext)

    const [plane_id, setPlaneId] = useState('')
    const [plane_type, setType] = useState('')
    const [photo, setPhoto] = useState('')
    const [serial, setSerial] = useState('')
    const [plane_name, setName] = useState('')
    const [seats_number, setSeatsNumber] = useState(null)
    const [classes, setClasses] = useState('')
    const [avialines, setAvialines] = useState('')
    const [entries_number, setEntriesNumber] = useState(null)
    const [luggage_capacity, setLuggageCapacity] = useState(null)
    const [fueltank_capacity, setFueltankCapacity] = useState(null)
    const [current_fuel_lvl, setCurrentFuelLevel] = useState(null)
    const [crew_member_count, setCrewMemberCount] = useState(null)
    const [status, setStatus] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let selectedValues = '';
            for (const option in checkboxes) { //перебор по индексам
                if (checkboxes[option]) //обращение к значению элемента массива по индексу
                    selectedValues += option += ', '
            }
            selectedValues = selectedValues.slice(0, -2) //удаляем последнюю запятую и пробел
            const response = await add_plane(plane_id, serial, plane_type, photo, plane_name, classes, avialines,
                seats_number, entries_number, crew_member_count, luggage_capacity,
                fueltank_capacity, current_fuel_lvl, status)
            context.store.setUserRequest(response)
            console.log(response)
        }
        catch (error) {
            console.error('status:', error.status, ' message', error.message)
            console.log(error)
        }
    }
    const [checkboxes, setCheckboxes] = useState({
        option1: false,
        option2: false,
        option3: false
    })
    const handleChange = (event) => {
        const { name, checked } = event.target //помещаем в переменные из переданного события имя и выбранность элемента target
        setCheckboxes({
            ...checkboxes,
            [name]: checked
        })
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit} method="post" id="form_post_plane">
                <label>Бортовой номер (номер гос.регистрации/ID самолёта)
                    <input type="text" id='plane_id' value={plane_id}
                        onChange={(e) => { setPlaneId(e.target.value) }} required></input>
                </label>
                <label>Тип самолёта
                    <input type="text" id='plane_type' value={plane_type}
                        onChange={(e) => { setType(e.target.value) }}></input>
                </label>
                <label>Серийный номер
                    <input type="text" id='serial' value={serial}
                        onChange={(e) => { setSerial(e.target.value) }} required></input>
                </label>
                <label>Фото самолёта
                    <input type="file" accept="image/*" id='plane_photo'
                        onChange={(e) => { setPhoto(e.target.files[0]) }}></input>
                </label>
                <div>{JSON.stringify(photo)}</div>
                <label>Название самолёта
                    <input type="text" id='plane_name' value={plane_name}
                        onChange={(e) => { setName(e.target.value) }} required></input>
                </label>
                <label>Кол-во сидений
                    <input type="number" id='seats_number' value={seats_number}
                        onChange={(e) => { setSeatsNumber(e.target.value) }} required></input>
                </label>
                <label class="classes">Классы
                    <label><input type="checkbox" id='econom' name='option1' value='Option 1 Value' onChange={handleChange} checked={checkboxes.option1}></input>Эконом</label>
                    <label><input type="checkbox" id='business' name='option2' value='Option 2 Value' onChange={handleChange} checked={checkboxes.option2}></input>Бизнес</label>
                    <label><input type="checkbox" id='vip' name='option3' value='Option 3 Value' onChange={handleChange} checked={checkboxes.option3}></input>VIP</label>
                    <p>{classes}</p>
                </label>
                <label>Авиалинии
                    <input type="text" id='airlines' value={avialines}
                        onChange={(e) => { setAvialines(e.target.value) }}></input>
                </label>
                <label>Кол-во входов
                    <input type="number" id='entries_number' value={entries_number}
                        onChange={(e) => { setEntriesNumber(e.target.value) }} required></input>
                </label>
                <label>Ёмкость багажного отсека (в литрах)
                    <input type="text" id='luggage_capacity' value={luggage_capacity}
                        onChange={(e) => { setLuggageCapacity(e.target.value) }}></input>
                </label>
                <label>Ёмкость бензобака (в литрах)
                    <input type="text" id='fueltank_capacity' value={fueltank_capacity}
                        onChange={(e) => { setFueltankCapacity(e.target.value) }}></input>
                </label>
                <label>Текущий уровень топлива (в литрах)
                    <input type="number" id='current_fuel_level' value={current_fuel_lvl}
                        onChange={(e) => { setCurrentFuelLevel(e.target.value) }}></input>
                </label>
                <label>Кол-во членов экипажа
                    <input type="number" id='crew_member_count' value={crew_member_count}
                        onChange={(e) => setCrewMemberCount(e.target.value)}></input>
                </label>
                <label>Статус
                    <input type="text" id='plane_status' value={status}
                        onChange={(e) => { setStatus(e.target.value) }}></input>
                </label>
                <div class="half">
                    <button type="submit" class="submit">Отправить</button>
                    <button type="reset" class="reset">Стереть</button>
                </div>
            </form>
        </div>
    )
})
export default App