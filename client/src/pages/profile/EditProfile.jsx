import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditProfile({ user, setLoggedInUser }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [resume, setResume] = useState("");

  const [stepText, setStepText] = useState("");
  const [stepStatus, setStepStatus] = useState("Applied");
  const [roadmap, setRoadmap] = useState([]);

  // 1. Load Data
  useEffect(() => {
    // Try to get user from Props OR Local Storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const currentUser = user || storedUser;

    if (currentUser) {
      setName(currentUser.name || "");
      setBio(currentUser.bio || "");
      setPhoto(currentUser.profilePic || "");
      setResume(currentUser.resume || "");
      setRoadmap(currentUser.roadmap || []);
    }
  }, [user]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => setResume(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("PDF only please!");
    }
  };

  const addStep = () => {
    if (!stepText.trim()) return;
    setRoadmap([...roadmap, { title: stepText, status: stepStatus }]);
    setStepText("");
  };

  // --- THE FIX IS HERE ---
  const saveProfile = async () => {
    try {
      // 1. Get the ID directly from the Browser's Memory
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const userId = storedUser ? storedUser._id : null;

      console.log("DEBUG: Trying to save for User ID:", userId); // Check Console!

      if (!userId) {
        alert("CRITICAL ERROR: No User ID found. Please Logout and Login again.");
        return;
      }

      // 2. Send Request
      const res = await axios.put(`http://localhost:5000/users/${userId}`, {
        name,
        bio,
        profilePic: photo,
        resume,
        roadmap
      });

      // 3. Update Memory
      setLoggedInUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile Saved Successfully!");
      navigate("/profile");

    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Failed to save. Check the Console (F12) for the exact error.");
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h1>Edit Profile</h1>

      {/* PICTURE */}
      <div style={{ marginBottom: "20px" }}>
        {photo && <img src={photo} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />}
        <br />
        <input type="file" accept="image/*" onChange={handlePhotoUpload} />
      </div>

      {/* RESUME */}
      <div style={{ marginBottom: "20px" }}>
         <label style={{fontWeight: "bold"}}>Resume: </label>
         {resume ? <span style={{color: "green"}}>PDF Selected</span> : <span>No PDF</span>}
         <br />
         <input type="file" accept="application/pdf" onChange={handleResumeUpload} />
      </div>

      {/* FORM */}
      <label>Name</label>
      <input style={styles.input} value={name} onChange={(e) => setName(e.target.value)} />

      <label>Bio</label>
      <textarea style={styles.input} value={bio} onChange={(e) => setBio(e.target.value)} />

      {/* ROADMAP */}
      <h3>Placement Roadmap</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input style={{flex: 1}} placeholder="Step" value={stepText} onChange={(e) => setStepText(e.target.value)} />
        <button onClick={addStep}>Add Step</button>
      </div>
      
      <ul>
        {roadmap.map((s, i) => <li key={i}>{s.status}: {s.title}</li>)}
      </ul>

      <br />
      <button onClick={saveProfile} style={styles.saveBtn}>Save Profile</button>
    </div>
  );
}

const styles = {
  input: { width: "100%", padding: "8px", margin: "5px 0 15px", display: "block" },
  saveBtn: { padding: "10px 20px", background: "#1a73e8", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default EditProfile;