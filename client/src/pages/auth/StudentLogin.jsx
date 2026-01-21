import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Added 'Link' here

function Login({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email: email,
        password: password
      });

      // Save to Memory & State
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setLoggedInUser(res.data.user);
      
      navigate("/"); 

    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa" }}>
      <div style={{ padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center", width: "350px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Student Login</h2>
        
        <input 
          type="email" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #e0e0e0", outline: "none" }}
        />
        
        <input 
          type="password" placeholder="Password" value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: "100%", padding: "12px", margin: "10px 0", borderRadius: "6px", border: "1px solid #e0e0e0", outline: "none" }}
        />
        
        {error && <p style={{color: "red", fontSize: "14px", marginTop: "5px"}}>{error}</p>}
        
        <button 
          onClick={handleLogin} 
          style={{ width: "100%", padding: "12px", background: "#1a73e8", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "20px", fontWeight: "600" }}
        >
          Login
        </button>

        {/* --- THIS IS THE NEW LINK --- */}
        <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#1a73e8", fontWeight: "600", textDecoration: "none" }}>
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;