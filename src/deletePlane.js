import {observer} from 'mobx-react-lite'
import React, {useContext, useState, useEffect} from "react"
import {delete_row, show_planes} from "./http/plane_queries"
import {Context} from "./index"
import './editPlanes.css'

const DeletePlane = observer(()=>{
    const {store} = useContext(Context)

    //React Component для отображения строки таблицы для редактирования
    function ShowTR({item,index}){
        const [ParamsId, setParamsId] = useState('')

        const deleteRow = async(event,item)=>{
            event.preventDefault();
            setParamsId(item.id);
            let approve = window.confirm("Вы уверены что хотите удалить эту запись?")
            if(approve){
                await delete_row(ParamsId).then(response=>alert(response));
            }
        }
        const showPlanes = async(event)=>{
            try{
                const all_planes = await show_planes();
                store.setRequest(all_planes)
                console.log('show_planes = ',all_planes)
                console.log('Request(show_planes) = ',store.getRequest())
            }
            catch(e){
                console.error(e)
            }

        }
        useEffect(()=>{showPlanes()},[])
        return(
            <tr key={index}>
                <td><button onClick={(e)=>{deleteRow(e,item)}}>Удалить запись</button></td>
                <td><img src={`http://localhost:7000/${item.filepath}`} style={{maxWidth:"300px"}} height="auto"/></td>
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
        )
    }
    return(
        <div class="App3">
            <div class="container">
                    <div className="table-like">
                        <thead>
                            <tr>
                                <th>Ничего</th>
                                <th>Фото</th>
                                <th>ID</th>
                                <th>Серийный номер</th>
                                <th>Тип</th>
                                <th>Наименование</th>
                                <th>Классы</th>
                                <th>Авиалинии</th>
                                <th>Кол-во сидений</th>
                                <th>Кол-во входов</th>
                                <th>Кол-во членов экипажа</th>
                                <th>Объём багажного отделения (м3)</th>
                                <th>Ёмкость топливного бака (л)</th>
                                <th>Текущий объем топлива (л)</th>
                                <th>Статус</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store.Request.map((item,index,array)=>
                                <ShowTR item = {item} index = {index}></ShowTR>
                            )}
                        </tbody>
                    </div>
            </div>
        </div>
    )
})

export default DeletePlane