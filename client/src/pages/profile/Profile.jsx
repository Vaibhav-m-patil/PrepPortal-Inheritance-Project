import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile({ user }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // 1. Try to use the Prop first
    if (user) {
      setProfile(user);
    } 
    // 2. If Prop is empty, check Local Storage (The Backup Plan)
    else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setProfile(storedUser);
      }
    }
  }, [user]);

  // If we still have no data, show the "Not Found" message
  if (!profile) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>No profile loaded</h2>
        <p>Please try logging in again.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* HEADER SECTION */}
      <div style={{ display: "flex", alignItems: "center", gap: "30px", marginBottom: "40px" }}>
        {/* Profile Picture */}
        <img 
          src={profile.profilePic || "https://via.placeholder.com/150"} 
          alt="Profile" 
          style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }}
        />
        
        {/* Name & Bio */}
        <div>
          <h1 style={{ margin: "0 0 10px 0" }}>{profile.name}</h1>
          <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.5" }}>{profile.bio || "No bio yet."}</p>
          
          <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
            <Link to="/profile/edit" style={styles.editBtn}>Edit Profile</Link>
            
            {/* Resume Button */}
            {profile.resume && (
              <a href={profile.resume} download="My_Resume.pdf" style={styles.resumeBtn}>
                 Download Resume 📄
              </a>
            )}
          </div>
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #eee", margin: "30px 0" }} />

      {/* ROADMAP SECTION */}
      <h2 style={{ marginBottom: "20px" }}>Placement Roadmap</h2>
      
      {profile.roadmap && profile.roadmap.length > 0 ? (
        <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "12px" }}>
          {profile.roadmap.map((step, index) => (
            <div key={index} style={{ display: "flex", marginBottom: "15px", alignItems: "center" }}>
              {/* Status Badge */}
              <span style={{ 
                background: step.status === "Placed" ? "#d1fae5" : step.status === "Interview" ? "#fef3c7" : "#e0e7ff",
                color: step.status === "Placed" ? "#065f46" : step.status === "Interview" ? "#92400e" : "#3730a3",
                padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", marginRight: "15px", minWidth: "80px", textAlign: "center"
              }}>
                {step.status}
              </span>
              
              {/* Step Title */}
              <span style={{ fontSize: "16px", fontWeight: "500" }}>{step.title}</span>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "#888", fontStyle: "italic" }}>No roadmap steps added yet.</p>
      )}
    </div>
  );
}

const styles = {
  editBtn: { textDecoration: "none", background: "#2563eb", color: "white", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "500" },
  resumeBtn: { textDecoration: "none", background: "#10b981", color: "white", padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "500" }
};

export default Profile;