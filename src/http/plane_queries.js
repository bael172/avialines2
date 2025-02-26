import {$host, $authHost} from './axios_connect.js'

export const add_plane = async(id,serial,type,name,airline,classes,
        seats_number,entries_number,crew_member_number,luggage_capacity,
        fueltank_capacity,current_fuel_level,status,formData)=>{
        try{
            const {response} = await $host.post('/query/plane/add',{
                data:{ 
                    id,serial,type,name,classes,airline,
                    seats_number,entries_number,crew_member_number,luggage_capacity,
                    fueltank_capacity,current_fuel_level,status
                },formData,
                headers:{
                    'Content-Type' : 'multipart/form-data'
                }
            })
                localStorage.setItem('info',JSON.stringify(response.data))
                return response.data
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
export const update_planes = async(id, type, filename, filepath, serial, name, 
                airline, classes, seats_count, entries_count, crew_count, 
                fuel_volume, baggage_volume, current_fuel_volume, status)=>{
    try{
        const {data} = await $host.patch('/query/plane/update_due_id/'+id,{
            id, serial, type, filename, filepath, name, classes, 
            airline, seats_number:seats_count, entries_count:entries_count, crew_count:crew_count, 
            luggage_capacity:baggage_volume, fueltank_capacity:fuel_volume, current_fuel_level:current_fuel_volume, status
        })
        return data
    }
    catch(error){
        alert(error)
        console.error(error)
    }
}