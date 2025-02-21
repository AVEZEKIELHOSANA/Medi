import React, { useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/pharmacies?search=${searchQuery}`);
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">MEDI</div>
        <FaBars className="menu-icon" />
      </header>
      <div className="search-bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      <div className="hero-section">
        <div className="welcome-text">
          <h2>Welcome to Medi! Your one-stop solution to find pharmacies near you at anytime and anywhere.</h2>
        </div>
        <div className="hero-image">
          <img src="/images/pharmacy.png" alt="Pharmacy" />
        </div>
      </div>
      <div className="promo-section">
        <div className="promo-card" onClick={() => navigate("/pharmacies")}> 
          <img src="/images/pharmacy1.png" alt="Looking for Pharmacy?" />
          <p>Looking for Pharmacy?</p>
        </div>
        <div className="promo-card">
          <img src="/images/pharmacy2.png" alt="Pharmacy Services" />
          <p>Pharmacy Services</p>
        </div>
        <div className="promo-card">
          <img src="/images/pharmacy3.png" alt="Medication Management" />
          <p>Medication Management</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
