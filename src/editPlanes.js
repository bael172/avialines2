import React, {useContext, useState, useEffect} from "react"
import {update_planeInfo, showPlanes} from "./http/plane_queries"
import {Context} from "./index"

const Edit = observer = (()=>{
    const store = useContext(Context.store)

    const [id, setNewId] = useState('')
    const [pfp, setNewPfp] = useState('')
    const [serial, setNewSerial] = useState('')
    const [type, setNewType] = useState('')
    const [name, setNewName] = useState('')
    const [classes, setNewClasses] = useState('')
    const [airline, setNewAirline] = useState('')
    const [seats_number, setNewSeatsNumber] = useState('')
    const [entries_number, setNewEntriesNumber] = useState('')
    const [crew_count, setNewCrewCount] = useState('')
    const [luggage_volume, setNewLuggageVolume] = useState('')
    const [fueltank_capacity, setNewFueltankCapacity] = useState('')
    const [current_fuel_lvl, setNewCurrentFuelLvl] = useState('')
    const [status, setNewStatus] = useState('')
    const [checkboxes, setCheckboxes] = useState({
        option1:false,
        option2:false,
        option3:false
    })
    const [labels, setLabels] = useState({
        option1:'econom',
        option2:'business',
        option3:'vip'
    })
    const edit_table = useState(false)
    const [file,setSelectedFile] = useState(null)

    const showPlanes = async(e) =>{
        const response = await showPlanes()
        console.log("Результат show_planes = ",response)
        store.setRequest(response)
        console.log("store= ",store.getRequest())
    }
    const handleSubmit = async(e)=>{
        let selectedValues = ''
        for(let option in checkboxes){
            checkboxes[option]? selectedValues+=labels[option]+', ' : null
        }
        selectedValues.slice(0,-2)
        setNewClasses(selectedValues)
        const result = confirm("Вы уверены что хотите изменить строку?")
        if(result){
            try{
                await update_planeInfo(id,pfp,serial,type,name,classes,airline,
                    seats_number,entries_number,crew_count,luggage_volume,fueltank_capacity,current_fuel_lvl,status)
                    .then(console.log(response))
            }
            catch(error){
                console.log(error)
            }
            
        }
    }
    function handleChange(event){
        const {name, checked} = event.target
        setCheckboxes({
            ...checkboxes,
            [name]:checked //option1 : true
        })
    }
    function handleFileChange(event){
        const file = event.target.files[0]
        setSelectedFile(file)
    }
    
    return(
        <div classsName="App">
            <div class="container">
                {edit_table?
                    (
                        <table className="show_planes">
                        <caption>Все самолёты</caption>
                        <thead>
                        <tr>
                            <th align="center"></th>
                            <th align="center">Фото</th>
                            <th align="center">ID</th>
                            <th align="center">Серийный номер</th>
                            <th align="center">Тип</th>
                            <th align="center">Наименование</th>
                            <th align="center">Классы</th>
                            <th align="center">Авиалинии</th>
                            <th align="center">Кол-во сидений</th>
                            <th align="center">Кол-во входов</th>
                            <th align="center">Кол-во членов экипажа</th>
                            <th align="center">Объём багажного отделения (м3)</th>
                            <th align="center">Ёмкость топливного бака (л)</th>
                            <th align="center">Текущий объем топлива (л)</th>
                            <th align="center">Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                            {store.Request.map((item,index,array)=>
                                <tr key={index}>
                                    <form onSubmit={handleSubmit}>
                                        <button type="submit">Изменить</button>
                                        <td><input type="file" accept="image/*"onChange={(e)=>handleFileChange(e)}></input></td>
                                        <td><input type="text" placeholder={item.id} value={id}></input></td>
                                        <td><input type="text" placeholder={item.serial} value={}></input></td>
                                        <td><input type="text" placeholder={item.type}></input></td>
                                        <td><input type="text" placeholder={item.name}></input></td>
                                        <td>
                                            <div class="block">
                                                <input type="checkbox" name="option1" onChange={(e)=>handleChange(e)} checked={checkboxes.option1}>{labels.option1}</input>
                                                <input type="checkbox" name="option2" onChange={(e)=>handleChange(e)} checked={checkboxes.option2}>{labels.option1}</input>
                                                <input type="checkbox" name="option3" onChange={(e)=>handleChange(e)} checked={checkboxes.option3}>{labels.option1}</input>
                                            </div>
                                        </td>
                                        <td><input type="text" placeholder={item.airline}></input></td>
                                        <td><input type="number" placeholder={item.seats_number}></input></td>
                                        <td><input type="number" placeholder={item.entries_number}></input></td>
                                        <td><input type="number" placeholder={item.crew_member_number}></input></td>
                                        <td><input type="number" placeholder={item.luggage_capacity}></input></td>
                                        <td><input type="number" placeholder={item.fueltank_capacity}></input></td>
                                        <td><input type="number" placeholder={item.current_fuel_level}></input></td>
                                        <td><input type="text" placeholder={item.status}></input></td>
                                    </form>
                                </tr>
                            )}
                        </tbody>
                    </table>
                        )
                    :
                    (
                    <table className="show_planes">
                        <caption>Все самолёты</caption>
                        <thead>
                        <tr>
                            <th align="center"></th>
                            <th align="center">Фото</th>
                            <th align="center">ID</th>
                            <th align="center">Серийный номер</th>
                            <th align="center">Тип</th>
                            <th align="center">Наименование</th>
                            <th align="center">Классы</th>
                            <th align="center">Авиалинии</th>
                            <th align="center">Кол-во сидений</th>
                            <th align="center">Кол-во входов</th>
                            <th align="center">Кол-во членов экипажа</th>
                            <th align="center">Объём багажного отделения (м3)</th>
                            <th align="center">Ёмкость топливного бака (л)</th>
                            <th align="center">Текущий объем топлива (л)</th>
                            <th align="center">Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                            {store.Request.map((item,index,array)=>
                                <tr key={index}>
                                    <button onClick={handleUpdate}>Изменить</button>
                                    <td>{item.pfp}</td>
                                    <td>{item.id}</td>
                                    <td>{item.serial}</td>
                                    <td>{item.type}</td>
                                    <td>{item.name}</td>
                                    <td>{item.classes}</td>
                                    <td>{item.airline}</td>
                                    <td>{item.seats_number}</td>
                                    <td>{item.entries_number}</td>
                                    <td>{item.crew_member_number}</td>
                                    <td>{item.luggage_capacity}</td>
                                    <td>{item.fueltank_capacity}</td>
                                    <td>{item.current_fuel_level}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    )
                }
            </div>
        </div>
    )
})

export default Edit