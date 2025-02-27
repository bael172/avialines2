//Библиотеки из node_modules
const express = require("express")
const cors = require("cors")
const path = require('path')
require('dotenv').config({path:'./db/.env'})
//собственные импорты
const sequelize = require('./db/db_connect')
const tables = require('./db/tables')
const router = require('./routes/index')

const PORT=process.env.PORT || 5000
//Подключаем express
const app=express() //Экземпляр express
app.use(cors()) //Разрешение запросов между разными доменами сервера и клиента
app.use(express.json()) //Считывание JSON-файлов с req.body

app.use('/query',router)

//Делает папку /uploads доступной по URL: uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/msg',(req,res) => { 
    res.status(200).json({message:"Working"})
})
    const start = async()=> {
        try{
            await sequelize.authenticate()
            await sequelize.sync()
            console.log('Connection to the DB has been established successfully');
            app.listen(PORT,() => console.log(`Server start on ${PORT}`))
        }
        catch (error) {
            console.error('Unable to connect to the database',error);
        }
    } 
    start()

//4x24oqwpH
