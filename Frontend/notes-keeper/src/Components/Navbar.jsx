import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Deleteacc from "./Deleteacc";

const Navbar = ({ showAlert, darkMode, setDarkMode }) => {
  const fullText = "A Secure Cloud Based Notes Manager";
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) setDisplayText(fullText.substring(0, i + 1)), i++;
      else clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logout success", "success");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      return newMode;
    });
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ width: "100%" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center">
          <img
            src="/NK logo.png"
            alt="Logo"
            className="img-fluid"
            style={{ width: "clamp(100px, 20vw, 250px)", height: "clamp(80px, 8vh, 100px)", objectFit: "contain" }}
          />
          <span className="text ms-2" style={{ fontFamily: "Merienda", fontSize: "clamp(0.7rem, 2vw, 2rem)" }}>
            {displayText}
            {showCursor && <span className="cursor">|</span>}
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" style={{
          filter: darkMode ? "invert(1)" : "invert(0)"
        }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="ms-auto d-flex align-items-center flex-wrap">
            <button onClick={toggleDarkMode} className="btn me-2" style={{ borderRadius: "50%" }}>
              {darkMode ? "🌞" : "🌙"}
            </button>
            <div className="me-2">
              <Deleteacc showAlert={showAlert} />
            </div>
            <button onClick={handleLogout} className="btn btn-danger" style={{ fontFamily: "Merienda" ,fontSize: "clamp(0.8rem, 2vw, 1rem)"}}>
              <i className="bi bi-box-arrow-in-left"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
