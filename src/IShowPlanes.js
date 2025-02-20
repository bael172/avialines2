import './IShowPlanes.css'
import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { show_planes as get_all } from './http/plane_queries'
import { userContext } from './index'

const Show = observer(() => {
    const [showList, setShowList] = useState(false)
    const [storage, setStorage] = useState([])
    const {store} = useContext(userContext)
    const fetch_data = async (e) => {
        try {
            const response = await get_all();
            console.log("response=",response)
            
            store.setUserRequest(response)
            console.log("store=",store.getUserRequest()) 
            
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
    
    let plane_arr
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
    document.body.style.backgroundColor = "BD348A"

    return (
        <div className="App1" >
            <button style={{ display: 'block', margin: '0 auto', width: '200px', height: '50px', backgroundColor: 'blue', color: 'white' }}
                onClick={(e) => toggleList(e.target)}>
                {showList ? 'Скрыть список' : 'Показать список'}
            </button>
            <ol>
                {showList ?
                //storage и user.store.getUserRequest это одно и то же
                    (
                        store.getUserRequest().map((item,index)=>{
                            <div>
                                <li key={index}>{item.id}</li>
                                <li>1</li>
                            </div>
                })
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