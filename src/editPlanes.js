import {observer} from 'mobx-react-lite'
import React, {useContext, useState, useEffect} from "react"
import {update_plane} from "./http/plane_queries"
import {Context} from "./index"
import './editPlanes.css'

const Edit = observer(()=>{
    const {store} = useContext(Context)

    const [ParamsId, setParamsId] = useState('')

    const [BodyId, setNewId] = useState('')
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

    const [items,setItems] = useState(store.Request.map(item=>({
        id:item.id,
        serial:item.serial,
        type:item.type,
        name:item.name,
        airline:item.airline,
        seats_count:item.seats_number,
        entries_count:item.entries_number,
        crew_count:item.crew_member_number,
        baggage_vl:item.luggage_capacity,
        fuel_vl:item.fueltank_capacity,
        current_fuel_lvl:item.current_fuel_level,
        status:item.status
    })))
    const [new_data,setNewData] = useState([])
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
    const [edit_table,setToggleEdit] = useState(false) //тоггл-элемент редактирование-просмотр таблицы
    const [file,setSelectedFile] = useState(null) //изображение самолёта

    const showPlanes = async(e) =>{
        const response = await showPlanes()
        console.log("Результат show_planes = ",response)
        store.setRequest(response)
        console.log("store.getRequest= ",store.getRequest())
    }
    const handleSubmit = async(e,index)=>{
        e.currentTarget.preventDefault();
        let selectedValues = ''
        for(let option in checkboxes){
            if(checkboxes[option]) selectedValues+=labels[option]+', '
        }
        selectedValues.slice(0,-2)
        setNewClasses(selectedValues)
        const plane={}
        if(BodyId!==''){
            plane[BodyId]=BodyId
        }
        serial!=='' && (plane[serial]=serial)
        type!=='' && (plane[type]=type)
        name!=='' && (plane[name]=name)
        classes!=='' && (plane[classes]=classes)
        airline!=='' && (plane[airline]=airline)
        seats_number!=='' && (plane[seats_number]=seats_number)
        entries_number!=='' && (plane[entries_number]=entries_number)
        crew_count!=='' && (plane[crew_count]=crew_count)
        luggage_volume!=='' && (plane[luggage_volume]=luggage_volume)
        fueltank_capacity!=='' && (plane[fueltank_capacity]=fueltank_capacity)
        current_fuel_lvl!=='' && (plane[current_fuel_lvl]=current_fuel_lvl)
        status!=='' && (plane[status]=status)
        const result = window.confirm("Вы уверены что хотите изменить строку?")
        setParamsId(items[index].id)
        if(result){
            try{
                const response = await update_plane(ParamsId,file,plane)
                console.log('axios response=',response)
                store.setRequest(response)
                console.log('store.getRequest=',store.getRequest)
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
    function toggle_edit(){
        setToggleEdit(prevToggleEdit => !prevToggleEdit)
    }
    
    return(
        <div class="App3">
            <div class="container">
                <button class="toggle_editTable" onClick={e=>toggle_edit(e)}>{edit_table? 'Режим Просмотра':'Режим Редактирования'}</button>
                <br></br>
                {edit_table?
                    (
                        <form onSubmit={(e,index)=>handleSubmit(e,index)}>
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
                                        <td><button type="submit">Сохранить изменения</button></td>
                                        <td><input type="file" accept="image/*" onChange={(e)=>handleFileChange(e)}></input></td>
                                        <td><input type="text" placeholder={item.id} value={BodyId} onChange={(e)=>setNewData([...new_data],new_data[index].id = e.target.value)}></input></td>
                                        <td><input type="text" placeholder={item.serial} value={serial} onChange={(e)=>setNewData([...new_data],new_data[index].serial = e.target.value)}></input></td>
                                        <td><input type="text" placeholder={item.type} value={type} onChange={(e)=>setNewData([...new_data],new_data[index].type = e.target.value)}></input></td>
                                        <td><input type="text" placeholder={item.name} value={name} onChange={(e)=>setNewName(e.target.value)}></input></td>
                                        <td>
                                            <div class="block">
                                                <input type="checkbox" name="option1" onChange={(e)=>handleChange(e)} checked={checkboxes.option1}></input>{labels.option1}
                                                <input type="checkbox" name="option2" onChange={(e)=>handleChange(e)} checked={checkboxes.option2}></input>{labels.option2}
                                                <input type="checkbox" name="option3" onChange={(e)=>handleChange(e)} checked={checkboxes.option3}></input>{labels.option3}
                                            </div>
                                        </td>
                                        <td><input type="text" placeholder={item.airline} value={airline} onChange ={(e)=>setNewAirline(e.target.value)}></input></td>
                                        <td><input type="number" placeholder={item.seats_count} value={seats_number} onChange ={(e)=>setNewSeatsNumber(e.target.value)}></input></td>
                                        <td><input type="number" placeholder={item.entries_count} value={entries_number} onChange ={(e)=>setNewEntriesNumber(e.target.value)}></input></td>
                                        <td><input type="number" placeholder={item.crew_count} value={crew_count} onChange ={(e)=>setNewCrewCount(e.target.value)}></input></td>
                                        <td><input type="number" placeholder={item.baggage_vl} value={luggage_volume} onChange ={(e)=>setNewLuggageVolume(e.target.value)}></input></td>
                                        <td><input type="number" placeholder={item.fuel_vl} value={fueltank_capacity} onChange ={(e)=>setNewFueltankCapacity(e.target.value)}></input></td>
                                        <td><input type="number" placeholder={item.current_fuel_lvl} value={current_fuel_lvl} onChange ={(e)=>setNewCurrentFuelLvl(e.target.value)}></input></td>
                                        <td><input type="text" placeholder={item.status} value={status} onChange ={(e)=>setNewStatus(e.target.value)}></input></td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                    </form>
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
                                    <td></td>
                                    <td><img src={`http://localhost:7000/${item.filepath}`} min-width="100px" height="auto"/></td>
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