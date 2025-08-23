import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const fullText = "A Secure Cloud Based Notes Manager";
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText((prev) => prev + fullText.charAt(i));
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
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Logo + Text */}
          <a className="navbar-brand d-flex align-items-center">
            <img
              src="/NK logo.png"
              alt="Logo"
              width="250"
              height="65"
              className="d-inline-block ms-5"
            />
            <span
              className="ms-3"
              style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: "2rem",
                whiteSpace: "pre",
              }}
            >
              {displayText}
              {showCursor && <span className="cursor">|</span>}
            </span>
          </a>

          <div className="me-5">
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
