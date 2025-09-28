import React, { useState, useEffect } from 'react';

const About = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: '1.6',
      overflowX: 'hidden'
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

    hero: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
      color: 'white'
    },
    heroContent: {
      maxWidth: '900px',
      padding: '0 20px',
      zIndex: 2
    },
    heroH1: {
      fontSize: '4rem',
      marginBottom: '20px',
      background: 'linear-gradient(135deg, #fff, rgba(13, 202, 240, 0.8))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'fadeInUp 1s ease-out'
    },
    heroP: {
      fontSize: '1.3rem',
      marginBottom: '30px',
      opacity: 0.9,
      animation: 'fadeInUp 1s ease-out 0.3s both'
    },
    heroButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      animation: 'fadeInUp 1s ease-out 0.6s both'
    },
    btnPrimary: {
      padding: '15px 30px',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      display: 'inline-block',
      background: 'rgba(13, 202, 240, 1)',
      color: 'white',
      cursor: 'pointer',
      border: 'none'
    },
    btnSecondary: {
      padding: '15px 30px',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      display: 'inline-block',
      background: 'transparent',
      color: 'white',
      border: '2px solid white',
      cursor: 'pointer'
    },
    section: {
      padding: '100px 0',
      position: 'relative',
      zIndex: 1
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    sectionTitle: {
      textAlign: 'center',
      fontSize: '2.5rem',
      marginBottom: '60px',
      color: '#333'
    },
    teamSection: {
      background: 'rgba(20, 0, 40, 0.8)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '30px'
    },
    teamCard: {
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      padding: '30px',
      textAlign: 'center',
      border: '1px solid rgba(13, 202, 240, 0.3)',
      backdropFilter: 'blur(10px)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    teamAvatar: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, rgba(13, 202, 240, 1), rgba(138, 43, 226, 0.8))',
      margin: '0 auto 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white'
    },
    projectSection: {
      background: 'rgba(10, 10, 40, 0.9)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(13, 202, 240, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    featureIcon: {
      width: '60px',
      height: '60px',
      background: 'rgba(13, 202, 240, 1)',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      marginRight: '20px',
      fontSize: '1.5rem'
    },
    techSection: {
      background: 'rgba(5, 5, 25, 0.85)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    techGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px'
    },
    techCard: {
      padding: '25px',
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(13, 202, 240, 0.2)',
      backdropFilter: 'blur(10px)',
      textAlign: 'center',
      transition: 'transform 0.3s ease'
    },
    faqSection: {
      background: 'rgba(15, 0, 30, 0.9)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    faqItem: {
      marginBottom: '20px',
      borderRadius: '15px',
      boxShadow: '0 3px 15px rgba(0,0,0,0.1)',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(13, 202, 240, 0.3)'
    },
    faqQuestion: {
      padding: '25px',
      cursor: 'pointer',
      fontWeight: 'bold',
      borderRadius: '15px',
      transition: 'background 0.3s ease',
      background: 'rgba(13, 202, 240, 0.2)',
      color: 'white',
      border: 'none',
      width: '100%',
      textAlign: 'left'
    },
    faqAnswer: {
      padding: '0 25px',
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      borderRadius: '0 0 15px 15px',
      background: 'rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.9)'
    },
    faqAnswerActive: {
      maxHeight: '200px',
      padding: '25px'
    }
  };

  // Define floating shapes data
  const floatingShapes = [
    {
      width: '300px',
      height: '300px',
      top: '10%',
      left: '5%',
      background: 'radial-gradient(circle, rgba(255, 20, 147, 0.3) 0%, rgba(138, 43, 226, 0.2) 50%, transparent 100%)',
      animationDelay: '0s'
    },
    {
      width: '250px',
      height: '250px',
      top: '50%',
      right: '10%',
      background: 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(30, 144, 255, 0.2) 50%, transparent 100%)',
      animationDelay: '3s'
    },
    {
      width: '200px',
      height: '200px',
      top: '80%',
      left: '30%',
      background: 'radial-gradient(circle, rgba(255, 165, 0, 0.3) 0%, rgba(255, 69, 0, 0.2) 50%, transparent 100%)',
      animationDelay: '6s'
    },
    {
      width: '180px',
      height: '180px',
      top: '30%',
      right: '40%',
      background: 'radial-gradient(circle, rgba(124, 252, 0, 0.3) 0%, rgba(50, 205, 50, 0.2) 50%, transparent 100%)',
      animationDelay: '2s'
    },
    {
      width: '220px',
      height: '220px',
      top: '70%',
      right: '60%',
      background: 'radial-gradient(circle, rgba(255, 20, 147, 0.25) 0%, rgba(186, 85, 211, 0.15) 50%, transparent 100%)',
      animationDelay: '4s'
    }
  ];

  const teamMembers = [
    { name: "Samadhan Radye", role: "Full Stack Developer & Project Lead", initials: "SR", skills: ["React", "Node.js", "Database Design"] },
    { name: "Yulissa Pathare", role: "Frontend Developer & UI/UX Designer", initials: "YP", skills: ["React", "CSS", "User Experience"] },
    { name: "Shreya Mondal", role: "Backend Developer & API Specialist", initials: "SM", skills: ["Express.js", "MongoDB", "REST APIs"] },
    { name: "Atharva Padte", role: "Full Stack Developer & Testing Lead", initials: "AP", skills: ["JavaScript", "Testing", "DevOps"] }
  ];

  const features = [
    { icon: "✍️", title: "Easy Blog Creation", description: "Intuitive editor with rich text formatting, image uploads, and draft management for seamless content creation." },
    { icon: "👥", title: "User Management", description: "Complete user authentication system with profiles, personalized dashboards, and secure login/registration." },
    { icon: "🎨", title: "Responsive Design", description: "Beautiful, mobile-first design that looks perfect on all devices and screen sizes." },
    { icon: "🔍", title: "Search & Discovery", description: "Advanced search functionality to help users discover interesting blogs and content easily." },
    { icon: "💬", title: "Community Features", description: "Interactive commenting system and user engagement tools to build a thriving blogging community." },
    { icon: "📊", title: "Analytics Dashboard", description: "Track blog performance, reader engagement, and growth metrics with comprehensive analytics." }
  ];

  const technologies = [
    { name: "React.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "Express.js", category: "Server" },
    { name: "MongoDB", category: "Database" },
    { name: "JWT", category: "Authentication" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "REST APIs", category: "Architecture" },
    { name: "Git & GitHub", category: "Version Control" }
  ];

  const faqData = [
    {
      question: "What is this blog website project about?",
      answer: "This is a full-featured blog posting website developed by our team of Computer Engineering students. It allows users to create, publish, and manage their own blogs with a modern, user-friendly interface."
    },
    {
      question: "What technologies did you use to build this?",
      answer: "We used the MERN stack (MongoDB, Express.js, React.js, Node.js) along with modern tools like JWT for authentication, Tailwind CSS for styling, and various other libraries for enhanced functionality."
    },
    {
      question: "What features does your blog website include?",
      answer: "Our platform includes user registration/login, blog creation and editing, responsive design, search functionality, user profiles, commenting system, and analytics dashboard for blog performance tracking."
    },
    {
      question: "How can users interact with the blogs?",
      answer: "Users can read blogs, search for specific content, create their own accounts to publish blogs, comment on posts, and manage their personal dashboard with their published content and analytics."
    },
    {
      question: "Is this project open source or available for viewing?",
      answer: "This is an academic project developed as part of our Computer Engineering coursework. The source code and documentation showcase our team's skills in modern web development technologies."
    }
  ];

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
          
          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(13, 202, 240, 0.4);
          }
          
          .btn-secondary:hover {
            background: white;
            color: #333;
          }
          
          .team-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(13, 202, 240, 0.3);
          }
          
          .tech-card:hover {
            transform: translateY(-5px);
          }
          
          .faq-question:hover {
            background: rgba(13, 202, 240, 0.3) !important;
          }
          
          @media (max-width: 768px) {
            .hero-h1 {
              font-size: 2.5rem !important;
            }
            .hero-buttons {
              flex-direction: column;
              align-items: center;
            }
            .feature-item {
              flex-direction: column;
              text-align: center;
            }
            .feature-icon {
              margin-right: 0 !important;
              margin-bottom: 15px;
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

      {/* Hero Section */}
      <section id="home" style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroH1} className="hero-h1">
            About Our Blog Website
          </h1>
          <p style={styles.heroP}>
            Discover the story behind our innovative blogging platform, built by passionate Computer Engineering students who believe in the power of sharing knowledge and creativity through technology.
          </p>
          <div style={styles.heroButtons} className="hero-buttons">
            <button style={styles.btnPrimary} className="btn-primary">
              Meet Our Team
            </button>
            <button style={styles.btnSecondary} className="btn-secondary">
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" style={{...styles.section, ...styles.teamSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>Meet Our Development Team</h2>
          <p style={{textAlign: 'center', fontSize: '1.2rem', marginBottom: '50px', color: 'rgba(255, 255, 255, 0.9)'}}>
            Four passionate Computer Engineering students working together to create amazing web experiences
          </p>
          <div style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} style={styles.teamCard} className="team-card">
                <div style={styles.teamAvatar}>{member.initials}</div>
                <h3 style={{marginBottom: '10px', color: 'white'}}>{member.name}</h3>
                <p style={{color: 'rgba(13, 202, 240, 1)', fontWeight: 'bold', marginBottom: '15px'}}>{member.role}</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center'}}>
                  {member.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} style={{
                      background: 'rgba(13, 202, 240, 0.2)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      border: '1px solid rgba(13, 202, 240, 0.4)'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section id="features" style={{...styles.section, ...styles.projectSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>Project Features</h2>
          <p style={{textAlign: 'center', fontSize: '1.2rem', marginBottom: '50px', color: 'rgba(255, 255, 255, 0.9)'}}>
            Explore the powerful features we've built into our blogging platform
          </p>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureItem}>
              <div style={styles.featureIcon}>{feature.icon}</div>
              <div>
                <h3 style={{marginBottom: '10px', color: 'white'}}>{feature.title}</h3>
                <p style={{color: 'rgba(255, 255, 255, 0.9)'}}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="tech" style={{...styles.section, ...styles.techSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>Technology Stack</h2>
          <p style={{textAlign: 'center', fontSize: '1.2rem', marginBottom: '50px', color: 'rgba(255, 255, 255, 0.9)'}}>
            Modern technologies powering our blog website
          </p>
          <div style={styles.techGrid}>
            {technologies.map((tech, index) => (
              <div key={index} style={styles.techCard} className="tech-card">
                <h3 style={{marginBottom: '10px', color: 'white'}}>{tech.name}</h3>
                <p style={{color: 'rgba(13, 202, 240, 1)', fontSize: '0.9rem'}}>{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{...styles.section, ...styles.faqSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>Frequently Asked Questions</h2>
          {faqData.map((faq, index) => (
            <div key={index} style={styles.faqItem}>
              <button
                onClick={() => toggleFaq(index)}
                style={styles.faqQuestion}
                className="faq-question"
              >
                {faq.question}
              </button>
              <div style={{
                ...styles.faqAnswer,
                ...(activeFaq === index ? styles.faqAnswerActive : {})
              }}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;