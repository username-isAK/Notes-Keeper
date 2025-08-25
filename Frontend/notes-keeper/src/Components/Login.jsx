import { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Login = ({ setIsAuthenticated, showAlert }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      setIsAuthenticated(true);
      showAlert("Login Success", "success");
      navigate("/");
    } else {
      showAlert("Login Failed due to invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ maxWidth: "40rem" }}>
      <h1 className="m-3 text-center" style={{ fontFamily: "cursive", backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem" }}>
        Welcome to Notes Keeper!
      </h1>
      <h3 className="m-3 text-center" style={{ fontFamily: "cursive", backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem" }}>
        Please Login to continue
      </h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ fontFamily: "cursive" }}>Email address</label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
            autoComplete="off"
            required
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label" style={{ fontFamily: "cursive" }}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            autoComplete="new-password"
            required
          />
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute`}
            style={{ right: "10px", top: "38px", cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button type="submit" className="btn btn-primary" style={{ fontFamily: "cursive" }}>
          <i className="bi bi-box-arrow-in-right"></i> Login
        </button>
      </form>

      <div className="mt-3 d-flex">
        <p style={{ fontFamily: "cursive", backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem" }}>
          Don't have an account?
        </p>
        <button className="btn btn-secondary ms-2" onClick={() => navigate("/signup")} style={{ fontFamily: "cursive" ,height:"6vh"}}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
