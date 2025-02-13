import './addPlane.css'
import {useContext, useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import { userContext } from './index.js'
import {add_plane} from './http/plane_queries.js'
const context = useContext(userContext)
const App = observer(()=>{
    const [plane_type,setType] = useState('')
    const [photo,setPhoto] = useState('')
    const [serial,setSerial] = useState('')
    const [plane_name,setName] = useState('')
    const [seats_number,setSeatsNumber] = useState('')
    const [classes,setClasses] = useState('')
    const [avialines,setAvialines] = useState('')
    const [entries_number,setEntriesNumber] = useState('')
    const [luggage_capacity,setLuggageCapacity] = useState('')
    const []
    const add = async(e)=>{
        e.preventDefault()
        try{
            add_plane(id,serial,pfp,plane_type,plane_name,classes,airline,
                        seats_number,entries_number,crew_member_number,luggage_capacity,
                        fueltank_capacity,current_fuel_lvl,status).then(
                        response => {
                            context.store.setUserRequest(response)
                            console.log(response)
                        })
        }
        catch(error){
            console.error('status:',error.status,' message',error.message)
        }
    } 
    return(
        <form onSubmit={add} method="post">
            <label>Тип самолёта
                <input type="text" id={aeroplane_type} value={plane_type}
                onChange={(e)=>{setType(e.target.value)}}></input>
            </label>
            <label>Серийный номер
                <input type="text" id={serial} value={serial}
                onChange={(e)=>{setType(e.target.value)}}></input>
            </label>
            <label>Фото самолёта
                <input type="file" id={plane_photo} value={photo}></input>
                onChange={(e)=>{setPhoto(e.target.value)}}
            </label>
            <label>Название самолёта
                <input type="text" id={plane_name} value={plane_name}></input>
                onChange={(e)=>{setName(e.target.value)}}
            </label>
            <label>Кол-во сидений
                <input type="number" id={seats_number} value={seats_number}
                onChange={(e)=>{setSeatsNumber(e.target.value)}}></input>
            </label>
            <label>Классы
                <input type="checkbox" id={econom} value={classes} onChange={(e)=>{setClasses(e.target.value)}}></input>
                <input type="checkbox" id={business} value={classes} onChange={(e)=>{setClasses(e.target.value)}}></input>
                <input type="checkbox" id={vip} value={classes} onChange={(e)=>setClasses(e.target.value)}></input>
            </label>
            <label>Авиалинии
                <input type="text" id={aeroplane_name} value={avialines}></input>
                onChange={(e)=>{setAvialines(e.target.value)}}
            </label>
            <label>Кол-во входов
                <input type="number" id={plane_name} value={entries_number}></input>
                onChange={(e)=>{setEntriesNumber(e.target.value)}}
            </label>
            <label>Ёмкость багажного отсека (литров)
                <input type="text" id={luggage_capacity} value={luggage_capacity}></input>
                onChange={(e)=>{setLuggageCapacity(e.target.value)}}
            </label>
            <label>Ёмкость бензобака (литров)
                <input type="text" id={plane_name} value={fueltank_capacity}></input>
                onChange={(e)=>{setFueltankCapacity(e.target.value)}}
            </label>
            <label>Текущий уровень топлива (литров)
                <input type="number" id={current_fuel_level} value={current_fuel_lvl}></input>
                onChange={(e)=>{setCurrentFuelLevel(e.target.value)}}
            </label>
            <label>Кол-во членов экипажа
                <input type="number" id={crew_member_count} value={crew_member_count}
                onChange={(e)=>setCrewMemberCount(e.target.value)}></input>
            </label>
            <label>Статус
                <input type="text" id={plane_status} value={status}></input>
                onChange={(e)=>{setStatus(e.target.value)}}
            </label>
            <button type="submit"></button>
        </form>
    )
})
export default App