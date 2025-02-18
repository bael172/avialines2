import './IShowPlanes.css'
import React, {useContext, useEffect, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {show_planes as get_all} from './http/plane_queries'
import {userContext} from './index'

const Show = observer(()=>{
    const [showList, setShowList] = useState(false)
    const user = useContext(userContext)
    try{
        get_all().then(response=>{
            user.store.setUserRequest(['get_all',response])
            console.log('тип данных:',typeof(response))
            console.log(response)
            return response
        })
    }
    catch(error){
        console.error(error)
    }
    const toggleList = ()=>{
        if(showList==false) setShowList(true)
        else setShowList(false)
    }
    document.body.style.backgroundColor="BD348A"
    const storage = user.store.getUserRequest()
    const plane_arr = Array.from(storage)
    return(
        <div className="App1" >
            <button style={{display:'block', margin:'0 auto', width:'200px', height:'50px', backgroundColor:'blue', color:'white'}}
            onClick={toggleList}>{showList ? 'Вывести все самолёты':'Скрыть все самолёты'}</button>
            <ol>
                {showList && user.store.getUserRequest() && user.store.getUserRequest().length>0 ?
                    (plane_arr.forEach((item,index)=>{
                        <li>{item}</li>
                    }))
                        :
                    (
                        showList ? '': <div>Нажмите кнопку для отображения пользователей</div>
                    )
                }
            </ol>
        </div>
    )
})
export default Show