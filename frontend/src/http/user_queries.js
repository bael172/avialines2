import {jwtDecode} from 'jwt-decode'
import {$host, $authHost} from './axios_connect.js'
import user_data from '../user_data.js'

export const add_user_data = async(user_data) =>{
    const {data} = await $host.post('query/user/reg',
        {passport:user_data.passport,
        surname:user_data.surname,
        name:user_data.name,
        lastname:user_data.lastname,
        email:user_data.email,
        phone:user_data.phone,
        login:user_data.login,
        passwd:user_data.password,
        passwdAgain:user_data.password_again,
        birthday:user_data.birthday,
        position:user_data.position,
        role:user_data.role});
        console.log(JSON.stringify(data))
        return data
}

export const registration = async(passport,surname,name,lastname,birthday,
    email,phone,login,passwd,passwdAgain,position,role //здесь должен быть такой же порядок как и в функции registration в App.js
 ) => {
    console.log('passwd:',passwd,' passwdAgain:',passwdAgain)
    const {data} = await $host.post('query/user/reg',
        {
            passport, surname, name, lastname, email, phone, login,
            passwd, passwdAgain, birthday, position, role
        }
    )
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}



