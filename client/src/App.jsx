import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Homenew";
import Stats from "./pages/stats/Stats";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Login from "./pages/auth/StudentLogin";
import Signup from "./pages/auth/Signup"; // We will make this file next!

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // New: Wait until we check memory

  useEffect(() => {
    // Check Local Storage when app starts
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser));
    }
    setLoading(false); // Finished checking
  }, []);

  if (loading) return <div>Loading...</div>; // Don't kick user out while checking

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={<Login setLoggedInUser={setLoggedInUser} />} 
        />
        <Route 
          path="/signup" 
          element={<Signup />} 
        />

        {/* Protected Routes */}
        <Route element={loggedInUser ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile user={loggedInUser} />} />
          <Route path="/profile/edit" element={<EditProfile user={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;