import React, { useState, useEffect } from 'react';

const Home = () => {
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
      maxWidth: '800px',
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
    templatesSection: {
      background: 'rgba(20, 0, 40, 0.8)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    templateGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '30px'
    },
    templateCard: {
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease'
    },
    templatePreview: {
      height: '200px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem'
    },
    templateInfo: {
      padding: '20px',
      color: '#333'
    },
    benefitsSection: {
      background: 'rgba(10, 10, 40, 0.9)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    benefitItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      padding: '20px',
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(13, 202, 240, 0.3)',
      backdropFilter: 'blur(10px)'
    },
    benefitNumber: {
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
    stepsSection: {
      background: 'rgba(5, 5, 25, 0.85)',
      backdropFilter: 'blur(15px)',
      color: 'white'
    },
    stepItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '40px',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(13, 202, 240, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    stepNumber: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, rgba(13, 202, 240, 1), rgba(13, 202, 240, 0.7))',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      marginRight: '30px',
      fontSize: '2rem'
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

  const faqData = [
    {
      question: "Is MyBlog free to use?",
      answer: "Yes! MyBlog offers a generous free plan that includes hosting, templates, and basic features. Premium plans are available for advanced features like custom domains and analytics."
    },
    {
      question: "Can I use my own domain name?",
      answer: "Absolutely! Premium subscribers can connect their custom domain names. Free users get a subdomain like yourname.myblog.com."
    },
    {
      question: "How do I import content from other platforms?",
      answer: "We support imports from WordPress, Medium, Blogger, and other major platforms. Our migration tool makes switching to MyBlog seamless."
    },
    {
      question: "Can I monetize my blog?",
      answer: "Yes! You can add Google AdSense, affiliate links, sponsored posts, and even sell products directly through your blog with our e-commerce integration."
    },
    {
      question: "What kind of support do you offer?",
      answer: "We provide 24/7 email support, extensive documentation, video tutorials, and a community forum where users help each other."
    }
  ];

  const templates = [
    { name: "Clean & Minimal", description: "Perfect for writers who love simplicity and elegance.", preview: "Minimal Blog" },
    { name: "Tech & Innovation", description: "Ideal for technology enthusiasts and developers.", preview: "Tech Blog" },
    { name: "Creative & Artistic", description: "Showcase your creative work with stunning visuals.", preview: "Creative Blog" },
    { name: "Professional & Business", description: "Perfect for corporate blogs and business content.", preview: "Business Blog" }
  ];

  const benefits = [
    { number: "1", title: "Easy to Use", description: "Intuitive drag-and-drop editor makes blogging effortless. No technical skills required - just focus on your content and let us handle the rest." },
    { number: "2", title: "SEO Optimized", description: "Built-in SEO tools help your content rank higher in search engines. Automatic meta tags, sitemap generation, and performance optimization included." },
    { number: "3", title: "Mobile Responsive", description: "Your blog looks perfect on all devices. Our responsive templates automatically adapt to smartphones, tablets, and desktops." },
    { number: "4", title: "Analytics Dashboard", description: "Track your blog's performance with detailed analytics. Monitor visitor stats, popular posts, and engagement metrics in real-time." },
    { number: "5", title: "Community Support", description: "Join thousands of bloggers in our supportive community. Get tips, feedback, and collaborate with fellow writers." }
  ];

  const steps = [
    { number: "1", title: "Sign Up & Choose Template", description: "Create your free account and select from our beautiful collection of templates. Customize colors, fonts, and layout to match your style." },
    { number: "2", title: "Write Your First Post", description: "Use our intuitive editor to craft your content. Add images, videos, and multimedia elements with simple drag-and-drop functionality." },
    { number: "3", title: "Customize & Design", description: "Make your blog unique with our customization tools. Adjust layouts, add widgets, and create a memorable brand identity." },
    { number: "4", title: "Publish & Share", description: "Hit publish and share your blog with the world. Use our built-in social sharing tools and SEO features to reach more readers." }
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
          
          .nav-link:hover {
            color: #333 !important;
          }
          
          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          
          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(13, 202, 240, 0.4);
          }
          
          .btn-secondary:hover {
            background: white;
            color: #333;
          }
          
          .template-card:hover {
            transform: scale(1.05);
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

            .step-item, .benefit-item {
              flex-direction: column;
              text-align: center;
            }
            .step-number, .benefit-number {
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
            Create a Blog Worth Sharing
          </h1>
          <p style={styles.heroP}>
            Transform your ideas into captivating stories with MyBlog's powerful yet simple blogging platform. Write, design, and share your content with the world.
          </p>
          <div style={styles.heroButtons} className="hero-buttons">
            <a style={styles.btnPrimary} href="http://localhost:3000/write_blog" className="btn-primary">
              Start Writing
            </a>
            <a style={styles.btnSecondary} href='http://localhost:3000/blogs' className="btn-secondary">
              Explore Blogs
            </a>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" style={{...styles.section, ...styles.templatesSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>Explore Beautiful Templates</h2>
          <p style={{textAlign: 'center', fontSize: '1.2rem', marginBottom: '50px', color: 'rgba(255, 255, 255, 0.9)'}}>
            Choose from our collection of stunning, professionally designed templates
          </p>
          <div style={styles.templateGrid}>
            {templates.map((template, index) => (
              <div key={index} style={styles.templateCard} className="template-card">
                <div style={styles.templatePreview}>{template.preview}</div>
                <div style={styles.templateInfo}>
                  <h3 style={{marginBottom: '10px'}}>{template.name}</h3>
                  <p style={{color: '#666'}}>{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={{...styles.section, ...styles.benefitsSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>Why Choose MyBlog?</h2>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.benefitItem}>
              <div style={styles.benefitNumber}>{benefit.number}</div>
              <div>
                <h3 style={{marginBottom: '10px'}}>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" style={{...styles.section, ...styles.stepsSection}}>
        <div style={styles.container}>
          <h2 style={{...styles.sectionTitle, color: 'white'}}>How to Get Started</h2>
          {steps.map((step, index) => (
            <div key={index} style={styles.stepItem}>
              <div style={styles.stepNumber}>{step.number}</div>
              <div>
                <h3 style={{marginBottom: '15px'}}>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
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

export default Home;