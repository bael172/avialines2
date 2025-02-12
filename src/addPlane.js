import {useContext, useState, useEffect} from 'react'
import {observer} from 'mobx-react-lite'
import { userContext } from './index.js'
const request = useContext(userContext)
const App = observer(()=>{
    const add_plane = async(e)=>{
        e.preventDefault()
        try{
            post_plane(type,name,seats_number,classes,airline,entries_number,
                laggage_capacity,fueltank_capacity,current_fuel_lvl,status).then(
                    response => {
                        request.store.setUserRequest(response)
                        console.log(response)
                    }
                )
        }
        catch(error){
            console.error('status:',error.status,' message',error.message)
        }
    } 
        
    render()
    return(
        <form onSubmit={add_plane} method="post">
            <label>Тип самолёта
                <input type="text" id={aeroplane_type} value={type}
                onChange={(e)=>{setType(e.target.value)}}></input>
            </label>
            <label>Фото самолёта
                <input type="file"></input>
            </label>
            <label>Серийный номер
                <input type="text" id={aeroplane_type} value={type}
                onChange={(e)=>{setType(e.target.value)}}></input>
            </label>
            <label>Фото самолёта
                <input type="text" id={aeroplane_pfp} value={pfp}></input>
                onChange={(e)=>{setPfp(e.target.value)}}
            </label>
            <label>Название самолёта
                <input type="text" id={aeroplane_name}></input>
                onChange={(e)=>{setName(e.target.value)}}
            </label>
            <label>Кол-во сидений
                <input type="number" id={aeroplane_type} value={type}
                onChange={(e)=>{setType(e.target.value)}}></input>
            </label>
            <label>Классы
                <input type="text" id={aeroplane_pfp} value={pfp}></input>
                onChange={(e)=>{setPfp(e.target.value)}}
            </label>
            <label>Авиалинии
                <input type="text" id={aeroplane_name}></input>
                onChange={(e)=>{setName(e.target.value)}}
            </label>
            <label>Кол-во входов
                <input type="number" id={plane_name}></input>
                onChange={(e)=>{setName(e.target.value)}}
            </label>
            <label>Ёмкость багажного отсека (литров)
                <input type="text" id={plane_pfp} value={pfp}></input>
                onChange={(e)=>{setPfp(e.target.value)}}
            </label>
            <label>Ёмкость бензобака (литров)
                <input type="text" id={plane_name}></input>
                onChange={(e)=>{setName(e.target.value)}}
            </label>
            <label>Текущий уровень топлива (литров)
                <input type="number" id={fuel_level}></input>
                onChange={(e)=>{setName(e.target.value)}}
            </label>
            <label>Кол-во членов экипажа
                <input type="number" id={crew_member}
                onChange={(e)=>setCrewMemberCount(e.target.value)}></input>
            </label>
            <label>Статус
                <input type="text" id={plane_status}></input>
                onChange={(e)=>{setStatus(e.target.value)}}
            </label>
            <button type="submit"></button>
        </form>
    )
})
export default App