import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";

//===============================================================

const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/login" element={Login} />

      </Routes>
    </div>
  );
};

export default App;
