import './IShowPlanes.css'
import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { show_planes as get_all } from './http/plane_queries'
import { userContext } from './index'

const Show = observer(() => {
    const [showList, setShowList] = useState(false)
    const [plane_list, setPlaneArr] = useState([])
    const user = useContext(userContext)
    const fetch_data = async (e) => {
        try {
            const response = await get_all();
            user.store.setUserRequest(response)
            setPlaneArr(response)
            console.log('тип данных:', typeof (response))
            return response
        }
        catch (error) {
            console.error(error)
        }
    }
    /*
    useEffect(()=>{
        fetch_data()
    },[showList]) //Пустой массив зависимостей - useEffect выполнится один раз
    */
    let plane_arr
    const toggleList = () => {
        //if(showList==false) setShowList(true)
        //else setShowList(false)
        if (!showList) {
            fetch_data().then(storage => plane_arr = storage)
           // console.log(storage)
        }

        setShowList(prevShowList => !prevShowList)
    }

    document.body.style.backgroundColor = "BD348A"

    return (
        <div className="App1" >
            <button style={{ display: 'block', margin: '0 auto', width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
                onClick={(e) => toggleList(e.target)}>
                {showList ? 'Скрыть список' : 'Показать список'}
            </button>
            <ol>
                {showList && user.store.getUserRequest() || plane_list ?
                    (
                        //console.log(typeof (plane_arr))
                        plane_arr.map((item,index)=>{
                        <li key={index}>{item}</li>})
                    )
                    :
                    (
                        showList ? '' : <div>Нажмите кнопку для отображения пользователей</div>
                    )
                }
            </ol>
        </div>
    )
})
export default Show