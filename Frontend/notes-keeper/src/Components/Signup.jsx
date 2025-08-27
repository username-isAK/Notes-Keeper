import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Signup = ({ setIsAuthenticated, showAlert,darkMode,setDarkMode }) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      showAlert("Passwords do not match", "danger");
      return;
    }

    const response = await fetch(`${API_URL}/api/auth/createuser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);
      setIsAuthenticated(true);
      showAlert("Signup Success", "success");
      navigate("/");
    } else {
      showAlert("Signup Failed", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const toggleDarkMode=()=>{
    setDarkMode((prevMode) => {
    const newMode = !prevMode;
    localStorage.setItem("darkMode", newMode);
    return newMode;
  });
  };


  return (
    <>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button onClick={toggleDarkMode} style={{ marginRight: "1rem", borderRadius: "50%" }}>
        {darkMode ? "🌞" : "🌙"}
      </button>
    </div>
    <div className="container" style={{maxWidth: "40rem" }}>
      <h1 className="m-3 text-center" style={{ fontFamily: "Merienda", backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem" }}>
        Welcome to Notes Keeper!
      </h1>
      <h3 className="m-3 text-center" style={{ fontFamily: "Merienda", backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem" }}>
        Create an Account
      </h3>
      <div className="form-wrapper position-relative">
      <form onSubmit={handleSubmit} autoComplete="off">
        <img src="/NK logo.png" alt="tag" className="corner-tag top-right" />
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ fontFamily: "Merienda" }}>Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required style={{ fontFamily: "Merienda" }}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ fontFamily: "Merienda" }}>Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required style={{ fontFamily: "Merienda" }}/>
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label" style={{ fontFamily: "Merienda" }}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            minLength={8}
            required
            style={{ fontFamily: "Merienda" }}
          />
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
            style={{ right: "10px", top: "38px", cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
          <div id="passwordHelp" className="form-text">Minimum 8 characters.</div>
        </div>
        <div className="mb-3 position-relative">
          <label htmlFor="confirmPassword" className="form-label" style={{ fontFamily: "Merienda" }}>Confirm Password</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={onChange}
            minLength={8}
            required
            style={{ fontFamily: "Merienda" }}
          />
          <i
            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
            style={{ right: "10px", top: "38px", cursor: "pointer" }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>
        <button type="submit" className="btn btn-primary" style={{ fontFamily: "Merienda" }}>
          <i className="bi bi-person-add"></i> Signup
        </button>
      </form>
      </div>
      <div className="mt-3 d-flex">
        <p style={{ fontFamily: "Merienda", backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem" }}>
          Already have an account?
        </p>
        <button className="btn btn-secondary ms-2" onClick={() => navigate("/login")} style={{ fontFamily: "Merienda",height:"6vh" }}>
          Login
        </button>
      </div>
    </div>
    </>
  );
};

export default Signup;
