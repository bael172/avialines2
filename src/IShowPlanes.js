import './IShowPlanes.css'
import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { show_planes as get_all } from './http/plane_queries'
import { Context } from './index'

const Show = observer(() => {
    const [showList, setShowList] = useState(false)
    const [storage, setStorage] = useState([])
    const {store} = useContext(Context)
    const fetch_data = async (e) => {
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
                                <th align="center">ID</th>
                                <th align="center">Фото</th>
                                <th align="center">Серийный номер</th>
                                <th align="center">Тип</th>
                                <th align="center">Наименование</th>
                                <th align="center">Классы</th>
                                <th align="center">Авиалинии</th>
                                <th align="center">Кол-во сидений</th>
                                <th align="center">Кол-во входов</th>
                                <th align="center">Кол-во членов экипажа</th>
                                <th align="center">Объём багажного отделения (л)</th>
                                <th align="center">Ёмкость топливного бака (л)</th>
                                <th align="center">Текущий объем топлива (л)</th>
                                <th align="center">Статус</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                store.Request.map((item,index)=>
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.pfp}</td>
                                    <td>{item.serial}</td>
                                    <td>{item.type}</td>
                                    <td>{item.name}</td>
                                    <td>{item.classes}</td>
                                    <td>{item.seats_number}</td>
                                    <td>{item.entries_number}</td>
                                    <td>{item.crew_member_number}</td>
                                    <td>{item.luggage_capacity}</td>
                                    <td>{item.fueltank_capacity}</td>
                                    <td>{item.current_fuel_level}</td>
                                    <td>{item.current_fuel_level}</td>
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