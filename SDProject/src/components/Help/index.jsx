import { useState, useEffect } from "react";
import "aos/dist/aos.css";   //   AOS (Animate On Scroll) library for animations
import AOS from "aos"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const Help = () => {
  const [lightMode, setLightMode] = useState(false);  // State for light or dark mode

  useEffect(() => {
    AOS.init(); // Initialize AOS animations  
    applyTheme(true);   // Set default theme to light mode
  }, []);
  // applies the theme based on the mode (light/dark)
  const applyTheme = (isLightMode) => {
    document.documentElement.style.setProperty("--bg", isLightMode ? "#ffffff" : "#000000");
    document.documentElement.style.setProperty("--text", isLightMode ? "#111111" : "#f1f1f1");
    document.documentElement.style.setProperty("--section-bg", isLightMode ? "#f8f9fa" : "#1a1a1a");
    document.documentElement.style.setProperty("--content-bg", isLightMode ? "#ffffff" : "#111111");
    document.documentElement.style.setProperty("--link", isLightMode ? "#1a73e8" : "#8ab4f8");
    document.documentElement.style.setProperty("--primary", isLightMode ? "linear-gradient(to right, #4c8bf5, #255afc)" : "linear-gradient(to right, #6a11cb, #2575fc)");
  };
  // toggles between light and dark mode
  const toggleDarkMode = () => {
    setLightMode((prevMode) => {
      const newMode = !prevMode;
      applyTheme(newMode);
      return newMode;
    });
  };
  // toggles the content visibility of each section
  const toggleContent = (e) => {
    const content = e.currentTarget.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  };

  return (
    <>
    {/* button to change the mode  */}
      <div style={{ backgroundColor: "var(--bg)", color: "var(--text)", minHeight: "100vh", paddingBottom: "50px" }}>
        <button className="theme-toggle" onClick={toggleDarkMode} style={styles.themeToggle}>
          {lightMode ? "Toggle Dark Mode" : "Toggle Light Mode"}
        </button>
        
        <h1 data-aos="fade-down" style={styles.header}>
          <i className="fas fa-user-md"></i> Help & Support
        </h1>
        
        {sections.map(({ title, icon, content }, index) => (
          <div className="section" key={index} data-aos="fade-up" style={styles.section}>
            <button className="collapsible" onClick={toggleContent} style={styles.collapsible}>
              <i className={icon}></i> {title}
            </button>
            <div className="content" style={styles.content}>
              {content}
            </div>
          </div>
        ))}
      </div>
      <footer style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: '50px',
        paddingTop: '10px',
        backgroundColor: '#797979',
        textAlign: 'center'
      }}>
        <p>&copy; 2025 hospital. All rights reserved.</p>
      </footer>
    </>
  );
};
// styles for the elements
const styles = {
  themeToggle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#333",
    border: "none",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
  header: {
    textAlign: "center",
    padding: "30px 20px",
    background: "var(--primary)",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  section: {
    backgroundColor: "var(--section-bg)",
    borderRadius: "12px",
    margin: "30px auto",
    padding: "0",
    maxWidth: "1000px",
    boxShadow: "0 4px 10px rgba(255,255,255,0.05)",
    overflow: "hidden",
  },
  collapsible: {
    background: "var(--primary)",
    color: "white",
    cursor: "pointer",
    padding: "18px 25px",
    width: "100%",
    textAlign: "left",
    fontSize: "18px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "none",
    transition: "background 0.3s",
  },
  content: {
    padding: "25px 30px",
    display: "none",
    backgroundColor: "var(--content-bg)",
    borderTop: "1px solid #333",
    fontSize: "16px",
    lineHeight: "1.8",
  },
};
// sections for the help page
const sections = [
  {
    title: "Introduction / Overview",
    icon: "fas fa-info-circle",
    content: (
      <ul>
        <li>Access and download test results</li>
        <li>Book appointments and set reminders</li>
        <li>View prescriptions and medication history</li>
        <li>Check billing and insurance details</li>
      </ul>
    ),
  },
  {
    title: "Frequently Asked Questions (FAQs)",
    icon: "fas fa-question-circle",
    content: (
      <ul>
        <li><strong>Can I cancel an appointment?</strong> – Yes, just go to the Appointments page and click "Cancel".</li>
        <li><strong>How do I get lab results?</strong> – Visit the “Test Results” section and download your report.</li>
        <li><strong>Is my data secure?</strong> – Absolutely. We use end-to-end encryption and follow GDPR compliance.</li>
        <li><strong>Can I contact my doctor?</strong> – Yes, use the messaging option in your profile.</li>
      </ul>
    ),
  },
  {
    title: "Common Issues & Fixes",
    icon: "fas fa-bug",
    content: (
      <ul>
        <li><strong>Can't log in:</strong> Try resetting your password using your email.</li>
        <li><strong>App not loading:</strong> Check your internet or refresh the browser.</li>
        <li><strong>Data missing:</strong> Wait a moment or contact support via live chat.</li>
      </ul>
    ),
  },
  {
    title: "Live Chat & Support",
    icon: "fas fa-comments",
    content: (
      <p>Need help? Use the chat icon in the bottom-right corner to connect with support in real-time.</p>
    ),
  },
];

export default Help;