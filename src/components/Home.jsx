import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';
import Navbar from './navbar.jsx';
import Footer from "./footer.jsx";
import Searching from "./Search.jsx";

function HomePage() {
  return (
    <div className="homepage">
      {/* Navbar */}
      <Navbar />

<Searching/>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>Your Health Our Priority</h1>
          <p>MediFinder your one-stop solution to find Medical services.</p>
          <button className="btn">Get Started</button>
          <button className="btn secondary">Find Care</button>
        </div>
        <div className="hero-image">
          <img src="./src/assets/final1.jpg" alt="pharmacie" />
        </div>
      </header>

      {/* Certifications */}
      <section className="certifications">
        <h1 className="About">About MediFinder</h1>
        <p>At MediFinder, our mission is to connect people with
          the right medical care, quickly and easily thereby simplifying healthcare access. Our platform
          allows users to search for real-time informations on pharmacies, hospitals and medical personnel(
          doctors, nurse, etc) where and when they need them.</p>


      </section>

      {/* Key Benefits */}
      <section className="benefits">
        <h2>.</h2>
        <ul>
          <li>d</li>
          <li>r</li>
          <li>d</li>
        </ul>
      </section>

      {/* Products */}
      <section className="products">
        <h2>Access your healthcare facility.</h2>
        <div className="product-cards">
          <div className="card">
            <Link className="link" to="./pharmacyList"><img src="./src/assets/happharma.jpg" alt="pharmacy search" />
              <h3>Easily find Pharmacy</h3>
              <p>Anytime, everywhere.</p>
            </Link>
          </div>
          <div className="card">
            <Link className="link" to="./hospital">
              <img src="who.png" alt="WHO Approved" />
              <h3>Get the nearest hospital</h3>
              <p>From Your Location.</p>
            </Link>
          </div>

          <div className="card">
            <Link to="./personel">
              <img src="cdc.png" alt="CDC Approved" />
              <h3>Need a Doctor</h3>
              <p>Don't worry, search for one .</p>
            </Link>
          </div>
        </div>
      </section>



      {/* How to Clean Hands */}
      <section className="how-to">
        <h2>Our Users are satified</h2>
        <ol>
          <li>No more panic in case of emergency</li>
          <li>Got Services adapted to their needs</li>
          <li>Enjoyed the safety our app provides</li>
        </ol>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;