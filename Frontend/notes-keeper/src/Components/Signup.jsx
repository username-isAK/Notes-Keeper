import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({setIsAuthenticated, showAlert}) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();

    console.log("Signup response:", json); 

    if (json.authtoken) {
      localStorage.setItem("token", json.authtoken);
      setIsAuthenticated(true)
      showAlert("Signup Success","success")
      navigate("/");
    }
    else {
      showAlert("Signup Failed","danger")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ maxWidth: "35rem" }}>
      <h1 className="container m-3" style={{ fontFamily: 'cursive',textAlign: 'center',backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem"}}>Welcome to Notes Keeper!</h1>
      <h3 className="m-3" style={{ fontFamily: 'cursive',textAlign: 'center',backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem"}}>Create an Account</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ fontFamily: 'cursive'}}>Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ fontFamily: 'cursive'}}>Email</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{ fontFamily: 'cursive'}}>Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} />
          <div id="emailHelp" className="form-text">Minimum 8 characters.</div>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
      <div className="mt-3">
        <p style={{ fontFamily: 'cursive',backgroundColor: "rgba(255,255,255,0.7)", padding: "0.5rem 0.75rem", borderRadius: "1rem"}}>Already have an account?</p>
        <button className="btn btn-secondary" onClick={() => navigate("/login")}>Login</button>
     </div>
    </div>
  );
};

export default Signup;
