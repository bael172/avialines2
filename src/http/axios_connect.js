import axios from "axios"
//require('dotenv').config({path:'./env'})

export const $host = axios.create({
    baseURL:'http://localhost:7000/query/'
})

export const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config =>{
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)