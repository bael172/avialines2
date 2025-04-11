import './IShowPlanes.css'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { show_planes as get_all } from './http/plane_queries'
import {$host} from './http/axios_connect'
import { Context } from './index'

const Show = observer(() => {
    const {store} = useContext(Context)

    const [showList, setShowList] = useState(false)
    const [storage, setStorage] = useState([])

    const fetch_data = async () => {
        try {
            const response = await get_all();
            console.log("response=",response)
            
            store.setRequest(response)
            console.log("store=",store.getRequest()) 
            
            setStorage(response)
            console.log("storage=",storage) //Array: 0
            return response
        }
        catch (error) {
            console.error(error)
        }
    }
    
    useEffect(()=>{
        fetch_data()
    },[]) //Пустой массив зависимостей - useEffect выполнится один раз
    
    const toggleList = () => {
        //if(showList==false) setShowList(true)
        //else setShowList(false)
        /*
        if (showList) {
            fetch_data().then(storage => plane_arr = storage)
            console.log(storage)
        }
        */
        setShowList(prevShowList => !prevShowList)
    }
    document.body.style.backgroundColor = "#FFFFFF"
    function TableCell ({item}){
        const [srcValue, setSrcValue] = useState('')
        const imgRef = useRef(null)
        useEffect(()=>{
            if(imgRef.current){
                setSrcValue(imgRef.current.getAttribute('src'))
            }
        },[item.filename])
        return (
            <td className='image'>
                <img 
                    ref={imgRef}
                    id={item.id}
                    src={`http://localhost:7000/${item.filepath}`}
                    style={{maxWidth:"200px", height:'auto'}} alt={item.filename}>
                </img>
            </td>
        )
         // src с item.id = 42380 = function wrap() { return fn.apply(thisArg, arguments); }uploads/plane_image-1740658547896-211837322.jpg
    }

    return (
        <div className="App1" >
            <button style={{ display: 'block', margin: '0 auto', width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
                onClick={(e) => toggleList(e.target)}>
                {showList ? 'Скрыть список' : 'Показать список'}
            </button>
            <div>
                {showList ?
                //storage и user.store.getUserRequest это одно и то же
                    (
                        <table className="show_planes">
                            <caption>Все самолёты</caption>
                            <thead>
                            <tr>
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
                            {
                                store.getRequest().map((item,index)=>
                                <tr key={index}>
                                    <TableCell item={item}></TableCell>
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
                    
                    :
                    (
                        showList ? '' : <div>Нажмите кнопку для отображения пользователей</div>
                    )
                }
            </div>
        </div>
    )
})
export default Show