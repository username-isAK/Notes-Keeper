import { useState,useEffect } from "react";
import Navbar from "./Components/Navbar";
import Notes from "./Components/Notes";
import Notestate from "./context/Notestate";
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from "./Components/Signup";
import Alert from "./Components/Alert";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <Notestate showAlert={showAlert}>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} alert={alert} darkMode={darkMode} setDarkMode={setDarkMode}/>
      </Router>
    </Notestate>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, showAlert, alert,darkMode,setDarkMode }) {
  const location = useLocation();

  return (
    <div className={darkMode? "darkmode":""}>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} darkMode={darkMode} setDarkMode={setDarkMode}/>
      )}
      <div><Alert className="alert-fixed" alert={alert} /></div>
      <Routes>
        <Route path="/" element={isAuthenticated ? (<Notes showAlert={showAlert} darkMode={darkMode}/>) : (<Navigate to="/login" />)}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} darkMode={darkMode} setDarkMode={setDarkMode}/>} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      </Routes>
    </div>
  );
}

export default App;
