import React, {  useState } from "react";
import "./style.css";
import axios from "axios";
import { auth , createUserWithEmailAndPassword , collection, addDoc,db} from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";






const Register = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

const navigate=useNavigate()


  const handleRegister = async (e) => {
    e.preventDefault(); 
    createUserWithEmailAndPassword(auth , email ,password)
    .then(result =>{ 
      console.log(result)
      try {
      const  docRef = addDoc (collection (db , "users"),{
        firstName,
        lastName,
        age,
        country,
        email,
        uid: result.user.uid,
        files : []
      }) 
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
    navigate("./login")
    
    })
      
    .catch (error =>{
     
      console.log(error)})
  }

    return (
      <>
      <Navbar/>
        <div className="Form">
          { (
            <>
              <p className="Title">Register:</p>
              <form onSubmit={handleRegister}>
                <br />
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <input
                  type="number"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Country"
                  onChange={(e) => setCountry(e.target.value)}
                />
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
                <button>Register</button>
                <br />
              </form>
              {status
                ? message && <div className="SuccessMessage">{message}</div>
                : message && <div className="ErrorMessage">{message}</div>}
            </>
          )}
        </div>
      </>
    );
};

export default Register;
