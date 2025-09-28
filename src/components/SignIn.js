import { useState, useEffect } from "react";

function SignIn() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const styles = {
        body: {
            margin: 0,
            padding: 0,
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: '1.6',
            overflowX: 'hidden',
            minHeight: '100vh'
        },
        parallaxBg: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '200vh',
            zIndex: -1,
            transform: `translateY(${scrollY * 0.2}px)`,
            background: `
                radial-gradient(ellipse at top, #1a0033 0%, transparent 50%),
                radial-gradient(ellipse at bottom, #0d1421 0%, transparent 50%),
                linear-gradient(135deg,
                    #0c0c0c 0%,
                    #1a0033 15%,
                    #2d1b69 30%,
                    #11998e 45%,
                    #38ef7d 60%,
                    #e65c00 75%,
                    #f093fb 90%,
                    #f5576c 100%
                )`
        },
        stars: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `translateY(${scrollY * 0.1}px)`,
            backgroundImage: `
                radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                radial-gradient(2px 2px at 160px 30px, #ddd, transparent)
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 150px',
            animation: 'sparkle 20s linear infinite'
        },
        cosmicDust: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: `translateY(${scrollY * 0.15}px) rotate(${scrollY * 0.05}deg)`,
            backgroundImage: `
                radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 30%),
                radial-gradient(circle at 85% 80%, rgba(13, 202, 240, 0.15) 0%, transparent 40%),
                radial-gradient(circle at 50% 50%, rgba(255, 20, 147, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 30% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 35%)
            `
        },
        containerStyle: {
            marginTop: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            position: "relative",
            zIndex: 1,
            padding: "20px"
        },
        formStyle: {
            width: "400px",
            maxWidth: "90vw",
            padding: "40px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 15px 35px rgba(0,0,0,0.3), 0 5px 15px rgba(13, 202, 240, 0.2)",
            border: "1px solid rgba(13, 202, 240, 0.3)",
            position: "relative",
            animation: "fadeInUp 0.8s ease-out"
        },
        formTitle: {
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "2rem",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #2d1b69, rgba(13, 202, 240, 1))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
        },
        formLabel: {
            fontWeight: "600",
            color: "#333",
            marginBottom: "8px",
            display: "block"
        },
        formInput: {
            width: "100%",
            padding: "12px 15px",
            border: "2px solid rgba(13, 202, 240, 0.2)",
            borderRadius: "10px",
            fontSize: "16px",
            transition: "all 0.3s ease",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            marginBottom: "20px",
            boxSizing: "border-box"
        },
        submitButton: {
            width: "100%",
            padding: "15px",
            backgroundColor: "rgba(13, 202, 240, 1)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "10px"
        }
    };

    // Define floating shapes data
    const floatingShapes = [
        {
            width: '300px',
            height: '300px',
            top: '20%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, rgba(138, 43, 226, 0.2) 50%, transparent 100%)',
            animationDelay: '0s'
        },
        {
            width: '250px',
            height: '250px',
            top: '60%',
            right: '15%',
            background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(30, 144, 255, 0.2) 50%, transparent 100%)',
            animationDelay: '3s'
        },
        {
            width: '200px',
            height: '200px',
            top: '10%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(255, 165, 0, 0.3) 0%, rgba(255, 69, 0, 0.2) 50%, transparent 100%)',
            animationDelay: '6s'
        },
        {
            width: '180px',
            height: '180px',
            top: '70%',
            left: '20%',
            background: 'radial-gradient(circle, rgba(124, 252, 0, 0.3) 0%, rgba(50, 205, 50, 0.2) 50%, transparent 100%)',
            animationDelay: '2s'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault(); // stop page reload

        try {
            const response = await fetch("http://localhost:8080/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                alert("✅ Signup successful!");
            } else {
                alert("❌ Error: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("❌ Something went wrong!");
        }
    };

    return (
        <div style={styles.body}>
            <style>
                {`
                    @keyframes sparkle {
                        0% { transform: translateX(0) translateY(0); }
                        100% { transform: translateX(-200px) translateY(-150px); }
                    }
                    
                    @keyframes float {
                        0%, 100% {
                            transform: translateY(0px) scale(1);
                            opacity: 0.7;
                        }
                        33% {
                            transform: translateY(-30px) scale(1.1);
                            opacity: 0.9;
                        }
                        66% {
                            transform: translateY(15px) scale(0.9);
                            opacity: 0.8;
                        }
                    }
                    
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .floating-shape {
                        position: absolute;
                        border-radius: 50%;
                        filter: blur(40px);
                        animation: float 8s ease-in-out infinite;
                    }
                    
                    .form-input:focus {
                        outline: none;
                        border-color: rgba(13, 202, 240, 0.6);
                        box-shadow: 0 0 0 3px rgba(13, 202, 240, 0.1);
                        transform: translateY(-2px);
                    }
                    
                    .submit-button:hover {
                        background: linear-gradient(135deg, rgba(13, 202, 240, 1), rgba(138, 43, 226, 0.8));
                        transform: translateY(-2px);
                        box-shadow: 0 8px 20px rgba(13, 202, 240, 0.4);
                    }
                    
                    .submit-button:active {
                        transform: translateY(0px);
                    }
                    
                    @media (max-width: 768px) {
                        .form-style {
                            width: 95vw !important;
                            padding: 30px 20px !important;
                            margin: 10px;
                        }
                    }
                `}
            </style>

            {/* Parallax Background */}
            <div style={styles.parallaxBg}>
                <div style={styles.stars}></div>
                <div style={styles.cosmicDust}></div>
                {floatingShapes.map((shape, index) => (
                    <div
                        key={index}
                        className="floating-shape"
                        style={{
                            width: shape.width,
                            height: shape.height,
                            top: shape.top,
                            left: shape.left,
                            right: shape.right,
                            background: shape.background,
                            animationDelay: shape.animationDelay,
                            transform: `translateY(${scrollY * (index + 1) * 0.08}px) rotate(${scrollY * 0.02 * (index + 1)}deg)`
                        }}
                    />
                ))}
            </div>

            <div style={styles.containerStyle} className="outdiv">
                <div className="main container1 form-style" style={styles.formStyle}>
                    <h2 style={styles.formTitle}>Create Account</h2>
                    
                    <div className="mb-3">
                        <label htmlFor="username" style={styles.formLabel}>
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control form-input"
                            style={styles.formInput}
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="email" style={styles.formLabel}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control form-input"
                            style={styles.formInput}
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="password" style={styles.formLabel}>
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control form-input"
                            style={styles.formInput}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100 submit-button"
                        style={styles.submitButton}
                        onClick={handleSubmit}
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;