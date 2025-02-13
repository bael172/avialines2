import {$host, $authHost} from './axios_connect.js'

export const add_plane = async(id,serial,pfp,type,name,classes,airline,
        seats_number,entries_number,crew_member_number,luggage_capacity,
        fueltank_capacity,current_fuel_level,status)=>{
        const {data} = await $host.post('/query/plane/get_all',
        {
            id,serial,pfp,type,name,classes,airline,
            seats_number,entries_number,crew_member_number,luggage_capacity,
            fueltank_capacity,current_fuel_level,status
        })
        localStorage.setItem('info',data)
        return data
    }