import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function MainLayout() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // --- NEW LOGOUT FUNCTION ---
  const handleLogout = () => {
    // 1. Delete the "ID Badge"
    localStorage.removeItem("user");
    
    // 2. Hard Refresh & Go to Login
    window.location.href = "/login";
  };
  // ---------------------------

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* TOP BAR */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "var(--card)",
          borderBottom: "1px solid var(--border)",
          padding: "15px 40px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* BRAND */}
        <strong
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "var(--brand)",
          }}
        >
          VJTI PrePortal
        </strong>

        {/* NAV */}
        <nav
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            gap: "30px",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/stats">Stats</Link>
          <Link to="/profile">Profile</Link>
        </nav>

        {/* SETTINGS */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowSettings(!showSettings)}>⚙</button>

          {showSettings && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "40px",
                background: "var(--card)",
                border: "1px solid var(--border)",
                padding: "10px",
                borderRadius: "6px",
                width: "120px" // Added width so it looks nicer
              }}
            >
              <button
                style={{ width: "100%", marginBottom: "8px", cursor: "pointer" }}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              {/* --- REAL LOGOUT BUTTON --- */}
              <button
                style={{ width: "100%", color: "red", cursor: "pointer" }}
                onClick={handleLogout} 
              >
                Logout
              </button>
              {/* -------------------------- */}
              
            </div>
          )}
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ padding: "40px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;