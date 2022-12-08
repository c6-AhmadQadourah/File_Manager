import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { auth , signInWithEmailAndPassword , onAuthStateChanged} from "../../firebaseConfig";
import axios from "axios";
import { AuthErrorCodes } from "@firebase/auth";
import { setUserId } from "../Redux/reducers/usersAuth";
import { set } from "firebase/database";
import Navbar from "../Navbar/Navbar";

const Login = () => {
const dispatch = useDispatch()
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);



  const handleLogin = async (e) => {
    e.preventDefault(); 
    signInWithEmailAndPassword(auth , email ,password)
    .then(result =>{ 
      setStatus(false)
      console.log(result.user)
dispatch(setUserId(result.user.uid))
navigate("/")
  

    
    })
      
    .catch (error =>{
      setStatus(true)
      setMessage( error.code== AuthErrorCodes.INVALID_PASSWORD ? "Invalid Password" : "Email Doesn't exist")
      console.log(error.code )})
  }
    return (
      <>
      <Navbar/>
        <div className="Form">
          <p className="Title">Login:</p>
          <form onSubmit={handleLogin}>
            <br />
  
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button>Login</button>
          </form>
  
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
      </>
    );
};

export default Login;
