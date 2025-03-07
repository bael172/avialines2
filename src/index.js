import React from 'react';
import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import UserStore from './store/userStore'
import UserRequest from './store/userRequest'
import './index.css';
import Registration from './Registration';
import PostPlane from './addPlane'
import ShowPlane from './IShowPlanes'
import EditPlane from './editPlanes'
export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      store: new UserRequest()
    }}>
      <Registration></Registration>
      <PostPlane></PostPlane>
      <ShowPlane></ShowPlane>
      <EditPlane></EditPlane>
    </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals