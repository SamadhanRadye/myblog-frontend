import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function HomeNav({ user, setUser }) {
    const [theme, setTheme] = useState("light");

    // Apply theme styles
    useEffect(() => {
        if (theme === "dark") {
            document.body.style.backgroundColor = "rgba(27, 29, 30, 1)";
            document.body.style.color = "grey";
        } else {
            document.body.style.backgroundColor = "rgba(173, 218, 226, 1)";
            document.body.style.color = "grey";
        }
    }, [theme]);

    const handleOnClick = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="navbar navbar-expand-lg fixed-top shadow"
            style={{
                backgroundColor: "#6610f2",
                borderBottom: "2px solid rgba(255,255,255,0.2)",
            }}
        >
            <div className="container-fluid">
                {/* Brand with animation */}
                <motion.div whileHover={{ scale: 1.1 }}>
                    <Link className="navbar-brand fw-bold text-white" to="/">
                        ✨ MyBlog
                    </Link>
                </motion.div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Nav links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {[
                            { path: "/", label: "🏠 Home" },
                            { path: "/about", label: "ℹ️ About" },
                            { path: "/write_blog", label: "✍️ Write Blog" },
                            { path: "/blogs", label: "📖 Blogs" },
                        ].map((item, idx) => (
                            <motion.li
                                key={idx}
                                className="nav-item"
                                whileHover={{ scale: 1.05, x: 4 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <Link className="nav-link text-white" to={item.path}>
                                    {item.label}
                                </Link>
                            </motion.li>
                        ))}

                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/login">
                                        🔑 Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/sign_in">
                                        📝 Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Theme Switch */}
                    <form className="d-flex align-items-center" role="search">
                        <motion.div
                            className="form-check form-switch pe-3 pt-2 text-white"
                            whileHover={{ scale: 1.1 }}
                        >
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="checkNativeSwitch"
                                checked={theme === "dark"}
                                onChange={handleOnClick}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="checkNativeSwitch"
                            >
                                {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
                            </label>
                        </motion.div>
                    </form>

                    {/* User Section */}
                    <div className="ms-3">
                        {user ? (
                            <motion.div className="dropdown" whileHover={{ scale: 1.05 }}>
                                <span
                                    className="nav-link dropdown-toggle text-white"
                                    id="userDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    👤 {user.username}
                                </span>
                                <motion.ul
                                    className="dropdown-menu"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    aria-labelledby="userDropdown"
                                >
                                    <li>
                                        <Link className="dropdown-item" to="/profile">
                                            📄 My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => {
                                                localStorage.removeItem("user");
                                                setUser(null);
                                            }}
                                        >
                                            🚪 Logout
                                        </button>
                                    </li>
                                </motion.ul>
                            </motion.div>
                        ) : (
                            <span className="text-white">👤 Guest</span>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

export default HomeNav;
