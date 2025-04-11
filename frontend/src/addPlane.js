import './addPlane.css'
import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from './index.js'
import { add_plane } from './http/plane_queries.js'

const App = observer(() => {
    const {store} = useContext(Context)

    const [plane_id, setPlaneId] = useState('')
    const [plane_type, setType] = useState('')
    const [serial, setSerial] = useState('')
    const [plane_name, setName] = useState('')
    const [seats_number, setSeatsNumber] = useState('')

    const [avialines, setAvialines] = useState('')
    const [entries_number, setEntriesNumber] = useState('')
    const [luggage_capacity, setLuggageCapacity] = useState('')
    const [fueltank_capacity, setFueltankCapacity] = useState('')
    const [current_fuel_lvl, setCurrentFuelLevel] = useState('')
    const [crew_member_count, setCrewMemberCount] = useState('')
    const [status, setStatus] = useState('')

    const [selectedFile, setSelectedFile] = useState(null)
    const [images, setImages] = useState([])

    const handleFileChange = (event) =>{
        setSelectedFile(event.target.files[0])
    }
    function checkbox_classes(){
        let selectedValues = ''
        for (let option in checkboxes) { //перебор по ключам свойств
            if (checkboxes[option]) //если значение итерируемого ключа option = true
                selectedValues +=  labels[option] + ', '
        }
        let classes = selectedValues.slice(0, -2) //удаляем последнюю запятую и пробел
        console.log("classes: ",classes)
        return selectedValues
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

            //Cтрока с классами удобства самолёта: econom, bussines и т.д.
            let classes = checkbox_classes();
        try {
            const response = await add_plane(plane_id, serial, plane_type, plane_name, avialines, 
                classes, seats_number, entries_number, crew_member_count, luggage_capacity,
                fueltank_capacity, current_fuel_lvl, status, selectedFile)
            store.setRequest(response)
            console.log('store.getRequest=',store.getRequest())
            setSelectedFile(null) //clear the selected file
        }
        catch (error) {
            console.error('status:', error?.response?.status, ' message', error?.message)
            console.log(error)
        }
    }
    //Значения checked чекбоксов
    const [checkboxes, setCheckboxes] = useState({
        option1: false,
        option2: false,
        option3: false
    })
    //Заголовки чекбоксов
    const [labels, setLabels] = useState({
        option1: '',
        option2: '',
        option3: ''
    })

    const handleChange = (event) => {
        //деструктуризация объекта event.target
        //помещаем в переменные name, value, checked значения одноименных ключей объекта event.target
        const { name, value, checked} = event.target 
        setCheckboxes({
            ...checkboxes, //копируем все свойства из checkboxes
            [name]: checked //заменяем значение одного из свойств c ключом name
        })
        setLabels({
            ...labels, //копируем все свойства из labels
            [name]: value //заменяем значение одного из свойств c ключом name
        })
    }
    return (
        <div className="App">
            <form onSubmit={handleSubmit} method="post" id="form_post_plane">
                <label>Бортовой номер (номер гос.регистрации/ID самолёта)
                    <input type="text" name='plane_id' id='plane_id' value={plane_id}
                        onChange={(e) => { setPlaneId(e.target.value) }} required></input>
                </label>
                <label>Тип самолёта
                    <input type="text" name='plane_type' id='plane_type' value={plane_type}
                        onChange={(e) => { setType(e.target.value) }}></input>
                </label>
                <label>Серийный номер
                    <input type="text" name='serial' id='serial' value={serial}
                        onChange={(e) => { setSerial(e.target.value) }} required></input>
                </label>
                <label>Фото самолёта
                    <input type="file" name='plane_image' accept="image/*" id='plane_photo'
                        onChange={(e) => {handleFileChange(e)}}></input>
                </label>
                <label>Название самолёта
                    <input type="text" name='plane_name' id='plane_name' value={plane_name}
                        onChange={(e) => { setName(e.target.value) }} required></input>
                </label>
                <label>Кол-во сидений
                    <input type="number" name='seats' id='seats_number' value={seats_number}
                        onChange={(e) => { setSeatsNumber(e.target.value) }} required></input>
                </label>
                <label class="classes">Классы
                    <label><input type="checkbox" id='econom' name='option1' value='econom' onChange={handleChange} checked={checkboxes.option1}></input>Эконом</label>
                    <label><input type="checkbox" id='business' name='option2' value='business' onChange={handleChange} checked={checkboxes.option2}></input>Бизнес</label>
                    <label><input type="checkbox" id='vip' name='option3' value='vip' onChange={handleChange} checked={checkboxes.option3}></input>VIP</label>
                </label>
                <label>Авиалинии
                    <input type="text" name="entries_number" id='airlines' value={avialines}
                        onChange={(e) => { setAvialines(e.target.value) }}></input>
                </label>
                <label>Кол-во входов
                    <input type="number" name="entries_number" id='entries_number' value={entries_number}
                        onChange={(e) => { setEntriesNumber(e.target.value) }} required></input>
                </label>
                <label>Ёмкость багажного отсека (в м3)
                    <input type="text" name="luggage_capacity" id='luggage_capacity' value={luggage_capacity}
                        onChange={(e) => { setLuggageCapacity(e.target.value) }}></input>
                </label>
                <label>Ёмкость бензобака (в литрах)
                    <input type="text" name="fueltank_capacity" id='fueltank_capacity' value={fueltank_capacity}
                        onChange={(e) => { setFueltankCapacity(e.target.value) }}></input>
                </label>
                <label>Текущий уровень топлива (в литрах)
                    <input type="number" name="current_fuel_lvl" id='current_fuel_level' value={current_fuel_lvl}
                        onChange={(e) => { setCurrentFuelLevel(e.target.value) }}></input>
                </label>
                <label>Кол-во членов экипажа
                    <input type="number" name="crew_member_count" id='crew_member_count' value={crew_member_count}
                        onChange={(e) => setCrewMemberCount(e.target.value)}></input>
                </label>
                <label>Статус
                    <input type="text" name="status" id='plane_status' value={status}
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