import {$host, $authHost} from './axios_connect.js'

export const add_plane = async(id,serial,type,name,airline,classes,
        seats_number,entries_number,crew_member_number,luggage_capacity,
        fueltank_capacity,current_fuel_level,status,image)=>{
        try{
            //Объеденяем в formData req.body и req.file
            const formData = new FormData();
            if(image){
                //plane_image должен совпадать с полем upload.single('plane_image') в middleware multer
                formData.append('plane_image',image);
            }
            formData.append('id',id);
            formData.append('serial',serial);
            formData.append('type',type);
            formData.append('name',name)
            formData.append('classes',classes);
            formData.append('airline',airline);
            formData.append('seats_number',seats_number);
            formData.append('entries_number',entries_number);
            formData.append('crew_member_number',crew_member_number);
            formData.append('luggage_capacity',luggage_capacity);
            formData.append('fueltank_capacity',fueltank_capacity);
            formData.append('current_fuel_level',current_fuel_level);
            formData.append('status',status);
            const response = await $host.post('query/plane/add',formData,{ //URL, тело запроса, объект config
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
                localStorage.setItem('info',JSON.stringify(response.data))
                return response.data
        }
        catch(error){
            alert("Ошибка записи данных в таблицу planes")
            console.error(error)
            throw error
        }
    }
export const get_one_plane = async(id)=>{
        await $host.get('query/get_due_id/'+`${id}`)
        .then(response => response.data)
        .catch(error => console.log(error))
}
export const show_planes = async()=>{
    try{
        console.log('show')
        const response = await $host.get('query/plane/get_all')
        return response.data
    }
    catch(error){
        console.log(error)
        alert("Ошибка axios вывода данных из таблицы planes")
        throw error
    }
}
export const update_plane = async(ParamsId, image, plane)=>{
    try{
        const formData = new FormData();
        if(image){
            //plane_image должен совпадать с полем upload.single('plane_image') в middleware multer
            formData.append('plane_image',image);
        }

        formData.append('id',plane.BodyId || '');
        formData.append('serial',plane.serial || '');
        formData.append('type',plane.type || '');
        formData.append('name',plane.name || '');
        formData.append('classes',plane.classes || '');
        formData.append('airline',plane.airline || '');
        formData.append('seats_number',plane.seats_count || '');
        formData.append('entries_number',plane.entries_count || '');
        formData.append('crew_member_number',plane.crew_count || '');
        formData.append('luggage_capacity',plane.baggage_volume || '');
        formData.append('fueltank_capacity',plane.fuel_volume || '');
        formData.append('current_fuel_level',plane.current_fuel_volume || '');
        formData.append('status',plane.status || '');
        const response = await $host.patch('/query/plane/update_due_id/'+ParamsId,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        localStorage.setItem('info',JSON.stringify(response.data))
        return response.data
    }
    catch(error){
        alert("Ошибка axios обновления данных в таблице planes")
        console.error(error)
        throw error
    }
}
export const delete_row = async(id)=>{
    try{
        const response = await $host.delete('/query/plane/delete_due_id/'+id)
        localStorage.setItem('info',JSON.stringify(response.data))
        return response.data
    }
    catch(error){
        alert("Ошибка axios удаления данных в таблице planes")
        console.error(error)
        throw error
    }
}