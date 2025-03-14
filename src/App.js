import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import PostPlane from './addPlane'
import EditPlane from './editPlanes'

function App(){
    return(
        <BrowserRouter>
            <PostPlane></PostPlane>
            <EditPlane></EditPlane>
        </BrowserRouter>
    )
}
export default App