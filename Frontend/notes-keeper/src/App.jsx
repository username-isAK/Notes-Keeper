import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Notes from "./Components/Notes";
import Notestate from "./context/Notestate";
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Signup from "./Components/Signup";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Notestate>
      <Router>
        <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </Notestate>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Notes /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
    </>
  );
}

export default App;
