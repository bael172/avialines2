import {observer} from 'mobx-react-lite'
import React, {useContext, useEffect, useState} from 'react'
import {update_plane, get_one_plane} from "./http/plane_queries"
import {Card} from 'react-bootstrap'

const EditPlaneCard = observer = (()=>{
    const {store:store} = useContext(Context)
    async function get_plane(){
        try{
            const response = await get_one_plane(id);
            if(response){
                store.setRequest(response);
                const planes = store.getRequest()
            }
            else console.error("Не удалось найти самолёт")
        }
        catch(error){
            const errorMessage = error.response?.data?.message || error.message || "Произошла ошибка"
            console.error(error)
            throw error
        }
    }
        planes.map(function (item,index,array){
            return(
                <Card>
                    <Card.Img variant="top" src=""></Card.Img>
                    <Card.Body>
                        <Card.Title>{item.id}</Card.Title>
                        <Card.Text></Card.Text>
                    </Card.Body>
                </Card>
            )

        })
})