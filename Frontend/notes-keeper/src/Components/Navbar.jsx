import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({showAlert}) => {
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

  return (
    <div>
      <nav className="navbar" style={{width:'auto',backgroundColor:'#fcfaeb'}}>
        <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
          <a className="navbar-brand d-flex align-items-center flex-wrap">
            <img
              src="/NK logo.png"
              alt="Logo"
              width="250rem"
              height="70rem"
              className="d-inline-block ms-5"/>
            <span
              className="ms-3"
              style={{
                fontFamily: "cursive",
                fontSize: "clamp(1rem, 2.5vw, 2rem)",
                whiteSpace: "pre-wrap"
              }}>
              {displayText}
              {showCursor && <span className="cursor">|</span>}
            </span>
          </a>

          <div className="ms-auto">
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
