import {$host, $authHost} from './axios_connect.js'

export const add_plane = async(id,serial,type,pfp,name,classes,airline,
        seats_number,entries_number,crew_member_number,luggage_capacity,
        fueltank_capacity,current_fuel_level,status)=>{
            try{
                const {data} = await $host.post('/query/plane/add',
                    {
                        id,serial,type,pfp,name,classes,airline,
                        seats_number,entries_number,crew_member_number,luggage_capacity,
                        fueltank_capacity,current_fuel_level,status
                    })
                    localStorage.setItem('info',data)
                    return data
            }
            catch(error){
                alert(error)
                console.error(error)
            }
    }
export const show_planes = async()=>{
    try{
        const {data} = await $host.get('/query/plane/get_all'
        )
        return data
    }
    catch(error){
        alert(error)
        console.error(error)
    }
}