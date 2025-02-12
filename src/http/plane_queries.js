import {$host, $authHost} from './axios_connect.js'

export const add_plane = async(type,name,seats_number,classes,airline,entries_number,
    laggage_capacity,fueltank_capacity,current_fuel_lvl,status)=>{
        const {data} = await $host.post('/query/plane/get_all',{
            type, name, seats_number, classes, airline, entries_number,
            laggage_capacity, fueltank_capacity, current_fuel_lvl, status
        })
        localStorage.setItem('info',data)
        return data
    }