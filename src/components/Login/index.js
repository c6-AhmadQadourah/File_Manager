import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import "./style.css";

import axios from "axios";


const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);



  const handleLogin = async (e) => {
    e.preventDefault(); }


    return (
      <>
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
