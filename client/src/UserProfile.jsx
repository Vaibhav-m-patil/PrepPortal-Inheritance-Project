import React, { useState, useEffect } from 'react';

const UserProfile = ({ currentUser, onSave }) => {
  // Initialize state with current user data or empty strings
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    year: "1st Year",
    regNo: "",
    branch: "",
    photo: null
  });

  // Load existing data when the component mounts
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        college: currentUser.college || "",
        year: currentUser.year || "1st Year",
        regNo: currentUser.regNo || "",
        branch: currentUser.branch || "",
        photo: currentUser.photo || null
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: imageUrl });
    }
  };

  const handleSubmit = () => {
    // Send the updated data back to the parent component (App.js)
    onSave(formData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Complete Your Profile</h2>
        
        {/* Photo Upload Section */}
        <div style={styles.photoContainer}>
          <div style={{
              ...styles.photoPreview,
              backgroundImage: formData.photo ? `url(${formData.photo})` : 'none'
          }}>
             {!formData.photo && <span>No Photo</span>}
          </div>
          <label style={styles.uploadBtn}>
             Upload Photo
             <input type="file" accept="image/*" style={{display:'none'}} onChange={handleImageUpload}/>
          </label>
        </div>

        {/* Form Inputs */}
        <div style={styles.formGrid}>
          <input 
            name="name" 
            value={formData.name} 
            placeholder="Full Name" 
            style={styles.input} 
            onChange={handleChange} 
          />
          <input 
            name="email" 
            value={formData.email} 
            placeholder="Email Address" 
            style={styles.input} 
            onChange={handleChange} 
          />
          <input 
            name="college" 
            value={formData.college} 
            placeholder="College Name" 
            style={styles.input} 
            onChange={handleChange} 
          />
          <input 
            name="branch" 
            value={formData.branch} 
            placeholder="Branch (CSE, ECE...)" 
            style={styles.input} 
            onChange={handleChange} 
          />
          <input 
            name="regNo" 
            value={formData.regNo} 
            placeholder="Registration Number" 
            style={styles.input} 
            onChange={handleChange} 
          />
          <select 
            name="year" 
            value={formData.year} 
            style={styles.input} 
            onChange={handleChange}
          >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
          </select>
        </div>

        <button style={styles.button} onClick={handleSubmit}>
            Save Profile
        </button>
      </div>
    </div>
  );
};

// Internal CSS Styles for this component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  photoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px'
  },
  photoPreview: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#eee',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #007bff',
    marginBottom: '10px',
    color: '#888',
    fontSize: '12px'
  },
  uploadBtn: {
    cursor: 'pointer',
    color: '#007bff',
    fontSize: '14px',
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px"
  }
};

export default UserProfile;