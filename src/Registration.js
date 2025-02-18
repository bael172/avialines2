import './Registration.css';
import {observer} from 'mobx-react-lite'
import React, {useState, useEffect, useContext} from 'react'

import {userContext} from "./index";
import { registration } from './http/user_queries'; //Обращение к axios запросам
//import Passport_data from './user_data'
const App = observer(()=>{
  const User = useContext(userContext) //в объект записывается value из <userContext.Provider/>
  const {UserRequest} = useContext(userContext) //в объект записывается value из <userContext.Provider/>
  const [seria,setSeria] = useState('')
  const [nomer,setNomer] = useState('')
  const [surname,setSurname] = useState('')
  const [name,setName] = useState('')
  const [lastname,setLastname] = useState('')
  const [birthday,setBirthday] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [position,setPosition] = useState('')
  const [role,setRole] = useState('')
  const [login,setLogin] = useState('')
  const [password,setPassword] = useState('')
  const [passwordAgain,setPasswordAgain] = useState('')
  const passport = seria+" "+nomer;
  const addUser = async(e)=>{
    e.preventDefault();
    try{
        registration(passport,surname,name,lastname,birthday,email,phone,login,password,passwordAgain,position,role).then(response => {//порядок передачи аргументов должен быть таким же как и в функции registration user_queries.js 
          User.user.setUser(response)
          User.user.setIsAuth(true)
          console.log(response)
        }) 
    }
    catch(error){
      alert(error)
    }
  }
  return (
    <div className="App">
        <form onSubmit={addUser} method='post' id='reg'>
          <div>Серия и номер паспорта</div>
          <div class="between">
            
            <div class="seria">
              
              <label for="seria">Серия</label>
              <input 
                type='number' id='seria' 
                value={seria}
                onChange={e=>setSeria(e.target.value)} required></input>
            
            </div>
            <div class="nomer">
              
              <label for="nomer">Номер</label>
              <input 
                type='number' id='nomer' 
                value={nomer}
                onChange={e=>setNomer(e.target.value)} required></input>
            
            </div>
          </div>
          
          <label for="surname">Фамилия</label>
            <input 
              type='text' id='surname' 
              value={surname}
              onChange={e=>setSurname(e.target.value)} required></input>
          
          <label for="name">Имя</label>
            <input 
              type='text' id='name' 
              value={name}
              onChange={e=>setName(e.target.value)} required></input>
          
          <label for="lastname">Отчество</label>
            <input 
              type='text' id='lastname' 
              value={lastname}
              onChange={e=>setLastname(e.target.value)} required></input>
          
          <label for="birthday">День рождения</label>
            <input 
              type='date' id='birthday' 
              value={birthday}
              onChange={e=>setBirthday(e.target.value)} required></input>
          
          <label for="email">Адрес электронной почты</label>
            <input 
              type='email' id='email' 
              value={email}
              onChange={e=>setEmail(e.target.value)} required></input>

          <label for="phone">Телефон</label>
            <input 
              type='tel' id='phone' 
              value={phone}
              onChange={e=>setPhone(e.target.value)} required></input>
          
          <label for="position">Должность</label>
            <input 
              type='text' id='position' 
              value={position}
              onChange={e=>setPosition(e.target.value)} required></input>
          
          <label for="role">Роль</label>
            <input 
              type='text' id='role' 
              value={role}
              onChange={e=>setRole(e.target.value)}></input>
          <br></br>
          
          <label for="login">Придумайте логин</label>
            <input 
              type='text' id='login'
              value={login}
              onChange={e=>setLogin(e.target.value)} required></input>
          
          <label for="password">Придумайте пароль</label>
            <input 
              type='password' id='password' 
              value={password}
              onChange={e=>setPassword(e.target.value)}></input>
          
          <label for="password_again">Повторите пароль</label>
            <input 
              type='password' id='password_again' 
              value={passwordAgain}
              onChange={e=>setPasswordAgain(e.target.value)}></input>
          
          <div class="submit">
            <input type="submit" class="submit_1" formAction={addUser}/*onClick={addUser}*/></input>
            <button type="submit" class="submit_2">Отправить форму 2</button>
          </div>
          
        </form>
    </div>
  );
})

export default App;