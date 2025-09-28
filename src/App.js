import { useState, useEffect } from "react";
import HomeNav from './components/HomeNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import SignIn from './components/SignIn';
import Login from './components/Login';
import WriteBlog from './components/WriteBlog';
import SeeBlogs from './components/SeeBlogs';
import UserProfile from './components/UserProfile'; // Import the new component
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage if already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="App">
      {/* Pass user and setUser to navbar */}
      <HomeNav user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign_in" element={<SignIn />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/write_blog" element={<WriteBlog user={user} />} />
        <Route path="/blogs" element={<SeeBlogs user={user} />} />
        <Route path="/profile" element={<UserProfile user={user} />} /> {/* Profile route */}
      </Routes>
    </div>
  );
}

export default App;
