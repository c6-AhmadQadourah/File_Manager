import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home/Home";
import Dropzone from "./components/Dropzone/Dropzone";
//===============================================================

const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/drop" element={<Dropzone/>} />

      </Routes>
    </div>
  );
};

export default App;
