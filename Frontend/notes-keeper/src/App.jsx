import { useState } from "react";
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

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <Notestate showAlert={showAlert}>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} alert={alert}/>
      </Router>
    </Notestate>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated, showAlert, alert }) {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar setIsAuthenticated={setIsAuthenticated} showAlert={showAlert}/>
      )}
      <div><Alert className="alert-fixed" alert={alert} /></div>
      <Routes>
        <Route path="/" element={isAuthenticated ? (<Notes showAlert={showAlert} />) : (<Navigate to="/login" />)}/>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} showAlert={showAlert} />} />
      </Routes>
    </div>
  );
}

export default App;
