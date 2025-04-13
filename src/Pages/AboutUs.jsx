import React from "react";
import { useNavigate } from "react-router-dom";
import './AboutUs.css';


const AboutUs = () => {
const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", lineHeight: "1.8" }}>
      {/* Hero Section */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "rgb(183, 7, 4)", fontSize: "2.5em", fontWeight:'bold' }}>About Us</h1>
        <p style={{ fontSize: "1.2em", color: "#555" }}>
          Empowering Learning, Enabling Growth
        </p>
      </header>

      {/* Introduction */}
      <section>
        <p>
          Welcome to <strong>Becoming Receptive Private Limited</strong>, where we redefine learning 
          and growth for individuals and organizations. As a trusted learning platform, we empower 
          our users with accessible, innovative, and impactful courses designed to transform lives. 
          Whether you're upskilling for a career or training a team, we're here to support you every step of the way.
        </p>
      </section>

      {/* Mission and Vision */}
      <section style={{ marginTop: "30px" }}>
        <h2>Our Mission</h2>
        <p>
          Our mission is to make high-quality learning opportunities accessible to everyone, fostering 
          personal and professional growth in a rapidly changing world.
        </p>

        <h2 style={{marginTop: "20px" }}>Our Vision</h2>
        <p>
          We envision a global community of learners connected through technology and a shared passion 
          for growth, breaking barriers to education and enabling lifelong learning.
        </p>
      </section>

      {/* Core Values */}
      <section style={{ marginTop: "30px" }}>
        <h2>Our Core Values</h2>
        <ul>
          <li><strong>Accessibility:</strong> Learning for everyone, everywhere.</li>
          <li><strong>Quality:</strong> Delivering excellence in every course and interaction.</li>
          <li><strong>Innovation:</strong> Leveraging technology to enhance the learning experience.</li>
          <li><strong>Community:</strong> Building supportive networks of learners and educators.</li>
          <li><strong>Integrity:</strong> Upholding trust, transparency, and ethics in all we do.</li>
        </ul>
      </section>

      {/* What We Offer */}
      <section style={{ marginTop: "30px" }}>
        <h2>What We Offer</h2>
        <ul>
          <li>Expert-designed courses across diverse domains.</li>
          <li>Flexible learning options, including self-paced and live sessions.</li>
          <li>Affordable pricing and accessible learning for individuals and organizations.</li>
          <li>Certificates to enhance career opportunities and validate skills.</li>
          <li>Customized training solutions for businesses and teams.</li>
        </ul>
      </section>

      {/* Our Journey */}
      <section style={{ marginTop: "30px" }}>
        <h2>Our Journey</h2>
        <p>
          Founded in 2021, <strong>Becoming Receptive Private Limited</strong> began with a vision to bridge 
          the gap between traditional education and the needs of modern learners. Today, we aspire to help learners achieve their goals.
        </p>
      </section>

      {/* Success Stories */}
      <section style={{ marginTop: "30px" }}>
        <h2>Success Stories</h2>
        <blockquote style={{ fontStyle: "italic", color: "#555" }}>
          "Thanks to Becoming Receptive, I was able to transition to a new career with confidence. 
          The courses are practical, engaging, and exactly what I needed!" – Sarah M., Learner
        </blockquote>
        <blockquote style={{ fontStyle: "italic", color: "#555", marginTop: "20px" }}>
          "Our team’s productivity has improved significantly since partnering with Becoming Receptive 
          for corporate training. Their tailored approach made all the difference." – John D., Corporate Client
        </blockquote>
      </section>

      {/* Call to Action */}
      <section style={{ marginTop: "40px", textAlign: "center" }}>
        <p style={{ fontSize: "1.2em", color: "#555" }}>
          Ready to start your learning journey? Join us today!
        </p>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "1em",
          }}
          onClick={() => navigate('/home')}
        >
          Explore Courses
        </button>
      </section>

      {/* Contact Information */}
      <footer style={{ marginTop: "50px", textAlign: "center", color: "#777" }}>
        <p>📧 Email: receptiveindia@gmail.com</p>
        <p>📞 Phone: +91-8839780907</p>
        <p>📍 Address: Shop no. 101, First Floor, Ajmani Complex, Vyapar Vihar, Bilaspur, Chhattisgarh, India, 495001</p>
        <p>
          🌐 Website:{" "}
          <a href="https://www.receptive.co.in" style={{ color: "#4CAF50" }}>
            receptive.co.in
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AboutUs;
