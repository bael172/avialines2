/*
import React, {useState, useEffect, useContext} from 'react'
import {userContext} from "./index"

function Passport_data(){
    const data = {}
    const form1 = document.getElementById('form1')
    let seria = form1.getElementById('seria').value
    let nomer = form1.getElementById('nomer').value
    const passport = seria.concat(" ",nomer)
    let surname = form1.getElementById('surname').value
    let name = form1.getElementById('name').value
    let lastname = form1.getElementById('lastname').value
    let birthday = form1.getElementById('birthday').value
    let email = form1.getElementById('email').value
    let phone = form1.getElementById('phone').value
    let position = form1.getElementById('position').value
    let role = form1.getElementById('role').value
    let login = form1.getElementById('login').value
    let password = form1.getElementById('password').value
    let password_again = form1.getElementById('password_again').value
    data.passport = passport
    data.surname = surname
    data.name = name
    data.lastname = lastname
    data.birthday = birthday
    data.email = email
    data.phone = phone
    data.position = position
    data.role = role
    data.login = login
    data.password = password
    data.password_again = password_again
    const newUser = useContext(userContext)
    newUser.setUser(data)
    return data
}
export default Passport_data()
*/




