import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:5000/auth/register", form);
      alert("Account Created! Please Login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f8f9fa" }}>
      <div style={{ padding: "40px", background: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center", width: "350px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Create Account</h2>
        
        <input name="name" placeholder="Full Name" onChange={handleChange} style={styles.input} />
        <input name="email" placeholder="Email" onChange={handleChange} style={styles.input} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input} />
        
        {error && <p style={{color: "red", fontSize: "14px"}}>{error}</p>}
        
        <button onClick={handleSignup} style={styles.button}>Sign Up</button>
        
        <p style={{marginTop: "15px", fontSize: "14px"}}>
          Already have an account? <Link to="/login" style={{color: "#1a73e8"}}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  input: { width: "100%", padding: "12px", margin: "8px 0", borderRadius: "6px", border: "1px solid #ddd" },
  button: { width: "100%", padding: "12px", background: "#1a73e8", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "15px", fontWeight: "600" }
};

export default Signup;