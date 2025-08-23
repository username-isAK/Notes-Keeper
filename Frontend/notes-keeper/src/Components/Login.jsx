import {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = ({setIsAuthenticated}) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if (json.success){
            localStorage.setItem('token', json.authtoken); 
            setIsAuthenticated(true)
            navigate("/");
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container" style={{width: '35rem'}}>
            <h1 className="container m-3" style={{ textAlign: 'center' }}>Welcome to Notes Keeper!</h1>
            <h3 className="m-3" style={{ textAlign: 'center' }}>Please Login to continue</h3>
            <form  onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" autoComplete="off" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" autoComplete="new-password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-3">
                <p>Don't have an account?</p>
                <button className="btn btn-secondary" onClick={() => navigate("/signup")}>Signup</button>
            </div>
        </div>
    )
}

export default Login