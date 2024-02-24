import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [alert, setAlert] = useState({msg:null, type:""});

  const changeAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    });
    setInterval(()=>{
      setAlert({msg:null, type:""})
    }, 3000)
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {alert && alert.msg && <Alert alert={alert} />}
          <div className='container'>
            <Routes>
              <Route path="/" element={<HomePage changeAlert={changeAlert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login changeAlert={changeAlert}/>} />
              <Route path="/signup" element={<Signup changeAlert={changeAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
