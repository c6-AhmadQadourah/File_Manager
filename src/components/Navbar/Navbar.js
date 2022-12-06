import React from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";




function Navbar() {

const navigate = useNavigate()



  return (
    <div className='navbar'>
        <div className='homeDivNav'> 
       <p onClick={()=>{ navigate('/')}} > Home </p> 
       </div>
       <div className='loginDivNav'> 
       <p  onClick={()=>{ navigate('/login')}} > Login </p> 
       <p  onClick={()=>{ navigate('/register')}} > Register </p> 
       </div>
    </div>
  )


}

export default Navbar