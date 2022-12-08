import React from 'react'
import "./Navbar.css"
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {setLogout , setFiles} from "../Redux/reducers/usersAuth"


function Navbar({setRefresh}) {

const navigate = useNavigate()
const dispatch = useDispatch()
const { isLoggedIn,userId } = useSelector((state) => {
  return {
    isLoggedIn: state.usersAuth.isLoggedIn,
    userId: state.usersAuth.userId,
   

  };
});





  return (
    <div className='navbar'>
        <div className='homeDivNav'> 
       {userId&& <p onClick={()=>{ navigate('/') ; setRefresh(true)}} > Home </p> }
       </div>
       <div className='loginDivNav'> 
      {!userId&&  <p  onClick={()=>{ navigate('/login')}} > Login </p> }
      {!userId&&   <p  onClick={()=>{ navigate('/register')}} > Register </p> }
      {userId&& <p onClick={()=>{ navigate('/drop')}}>  Upload new File</p>}
      {userId&& <p onClick={()=>{ dispatch(setLogout()) ; dispatch(setFiles([])) ; navigate("/login") }}>  Logout</p>}
      
       </div>
    </div>
  )


}

export default Navbar