import {observer} from 'mobx-react-lite'
import React, {useContext, useState, useEffect} from "react"
import {update_plane, show_planes} from "./http/plane_queries"
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

    const [new_data,setNewData] = useState({})

    const IShowPlanes = async(e) => {
        try{
            const response = await show_planes()
            console.log("Результат show_planes = ",response)
            store.setRequest(response)
            console.log("store.getRequest= ",store.getRequest())
        }
        catch(e){
            console.error(e)
        }

    }
    useEffect(()=>{IShowPlanes()},[])

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


    const handleSubmit = async(e,index)=>{
        e.currentTarget.preventDefault();
        let selectedValues = ''
        for(let option in checkboxes){
            if(checkboxes[option]) selectedValues+=labels[option]+', '
        }
        selectedValues.slice(0,-2)
        setNewClasses(selectedValues)
        
        const result = window.confirm("Вы уверены что хотите изменить строку?")
        if(result){
            try{
                const response = await update_plane(ParamsId,file,new_data)
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

    //React Component для отображения строки таблицы для редактирования
    function EditTR({item,index}){

        function handlePlaneChange(value, current_id, key_name){
            if(new_data[current_id]){
                setNewData((prev)=>({...prev, current_id: { key_name:value, ...current_id }}))
            }
        }

        return (
            <tr key={index}>
                <td><button onClick={() => setParamsId(item.id)} type="submit">Сохранить изменения</button></td>
                <td><input type="file" accept="image/*" onChange={(e)=>handleFileChange(e)}></input></td>
                <td><input type="text" placeholder={item.id} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "id")}></input></td>
                <td><input type="text" placeholder={item.serial} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "serial")}></input></td>
                <td><input type="text" placeholder={item.type} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "type")}></input></td>
                <td><input type="text" placeholder={item.name} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "name")}></input></td>
                <td>
                    <div class="block">
                        <input type="checkbox" name="option1" onChange={(e)=>handleChange(e)} checked={checkboxes.option1}></input>{labels.option1}
                        <input type="checkbox" name="option2" onChange={(e)=>handleChange(e)} checked={checkboxes.option2}></input>{labels.option2}
                        <input type="checkbox" name="option3" onChange={(e)=>handleChange(e)} checked={checkboxes.option3}></input>{labels.option3}
                    </div>
                </td>
                <td><input type="text" placeholder={item.airline} onChange={(e)=>handlePlaneChange(e.target.value, item.airline, "airline")}></input></td>
                <td><input type="number" placeholder={item.seats_number} onChange={(e)=>handlePlaneChange(e.target.value, item.seats_number, "seats_number")}></input></td>
                <td><input type="number" placeholder={item.entries_number} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "entries_number")}></input></td>
                <td><input type="number" placeholder={item.crew_member_number} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "crew_member_number")}></input></td>
                <td><input type="number" placeholder={item.luggage_capacity} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "luggage_capacity")}></input></td>
                <td><input type="number" placeholder={item.fueltank_capacity} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "fueltank_capacity")}></input></td>
                <td><input type="number" placeholder={item.current_fuel_level} onChange={(e)=>handlePlaneChange(e.target.value, item.id, "current_fuel_level")}></input></td>
                <td><input type="text" placeholder={item.status} onChange={(e)=>handlePlaneChange(e.target.value, item.status, "status")}></input></td>
            </tr>
        )
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
                            <EditTR item={item} index={index}></EditTR>
                            )}
                        </tbody>
                    </table>
                    </form>
                        )
                    //onChange ={(e)=>setNewData([...new_data],new_data[index].status = e.target.value)}
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
                            {store.getRequest().map((item,index,array)=>
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