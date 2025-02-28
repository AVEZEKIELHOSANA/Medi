import React from "react";
import {Link} from "react-router-dom"

function Navbar(){
    return(
<div>
<nav className="navbar">
        <div className="logo"><strong><img src="./src/assets/logo.png" alt="LOGO"/>MEDIFINDER</strong></div>
        <ul className="nav-links">
          <li><Link to="./Home">Home</Link></li>
          
<li><Link to="pharmacyList">Medical facility</Link></li>
          
          <li></li>
          <li><Link to="/emergency">Emergency Contact</Link></li>
          <li>Account</li>
          <Link to="/Signup"> <button> Sign Up </button></Link>
        </ul>
       
      </nav>
</div>
    );
}
export default Navbar