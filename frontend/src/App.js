import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import PostPlane from './addPlane'
import EditPlane from './editPlanes'
import DeletePlane from './deletePlane'

function App(){
    return(
        <BrowserRouter>
            <PostPlane></PostPlane>
            <EditPlane></EditPlane>
        </BrowserRouter>
    )
}
export default App