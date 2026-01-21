import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  // 1. LOAD POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/posts");
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, []);

  // 2. SAVE NEW POST (Dynamic Author)
  const addPost = async () => {
    if (!newPost.trim()) return;

    // --- GET REAL USER NAME HERE ---
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const realName = storedUser ? storedUser.name : "Anonymous Student"; 
    // -------------------------------

    try {
      const res = await axios.post("http://localhost:5000/posts", {
        content: newPost,
        author: realName // <--- Now it sends "MOHD ALI RAZA SHAIKH"
      });

      setPosts([res.data, ...posts]);
      setNewPost("");

    } catch (err) {
      console.error(err);
      alert("Failed to post");
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontWeight: "800", color: "#1a73e8", marginBottom: "5px" }}>
        VJTI PREPORTAL
      </h1>

      <p style={{ fontWeight: "600", color: "#666", marginBottom: "20px" }}>
        Get to know everything about VJTI placements from your peers
      </p>

      {/* INPUT AREA */}
      <textarea
        placeholder="Write your experience here..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        style={{ width: "100%", height: "100px", padding: "14px", borderRadius: "12px", border: "1px solid #ddd", resize: "none", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}
      />

      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <button onClick={addPost} style={{ padding: "10px 24px", background: "#1a73e8", color: "#fff", border: "none", borderRadius: "20px", fontWeight: "bold", cursor: "pointer" }}>
          Post Update
        </button>
      </div>

      {/* POSTS LIST */}
      <div style={{ marginTop: "40px" }}>
        {posts.map((p) => (
          <div key={p._id} style={{ padding: "20px", marginBottom: "15px", background: "white", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid #f0f0f0" }}>
            
            {/* Post Header */}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "12px", color: "#888" }}>
              <span style={{ fontWeight: "bold", color: "#333", textTransform: "uppercase" }}>
                @{p.author} {/* This will now show your real name */}
              </span>
              <span>{new Date(p.createdAt).toLocaleDateString()}</span>
            </div>

            <div style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
                {p.content} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;