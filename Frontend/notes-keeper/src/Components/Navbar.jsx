import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({showAlert,darkMode,setDarkMode}) => {
  const fullText = "A Secure Cloud Based Notes Manager";
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    showAlert("Logout success","success")
    navigate("/login");
  };

  const toggleDarkMode=()=>{
    setDarkMode((prevMode) => {
    const newMode = !prevMode;
    localStorage.setItem("darkMode", newMode);
    return newMode;
  });
  };

  return (
    <div>
      <nav className="navbar" style={{width:'auto'}}>
        <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
          <a className="navbar-brand d-flex align-items-center flex-wrap">
            <img
              src="/NK logo.png"
              alt="Logo"
              className="d-inline-block ms-1 img-fluid"
              style={{ width: "clamp(100px, 20vw, 250px)",                                        
                        height: "clamp(80px, 8vh, 100px)", 
                        objectFit: "contain"}}/>
            <span
              className="text ms-1"
              style={{
                fontFamily: "cursive",
                fontSize: "clamp(1rem, 2vw, 2rem)",
                whiteSpace: "pre-wrap"
              }}>
              {displayText}
              {showCursor && <span className="cursor">|</span>}
            </span>
          </a>
          
          <div className="ms-auto">
              <button onClick={toggleDarkMode} style={{marginRight:'1rem',borderRadius:'50%'}}>
                {darkMode ? "🌞" : "🌙"}
              </button>
              <button onClick={handleLogout} className="btn btn-danger ms-auto" style={{fontFamily: "cursive",
                fontSize: "clamp(0.8rem, 2vw, 1rem)"}}>
                <i class="bi bi-box-arrow-in-left"></i>
                Logout
              </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
