import React from "react";
import {Link} from "react-router-dom"

function Navbar(){
    return(
<div>
<nav className="navbar">
        <div className="logo"><strong><img src="./src/assets/logo.png" alt="LOGO"/>MEDIFINDER</strong></div>
        <ul className="nav-links">
          <li><Link to="./Home">Home</Link></li>
          <li>Pharmacies</li>
          <li>Hospitals</li>
          <li>Emergency Contact</li>
          <li>Account</li>
          <button>Sign up</button>
        </ul>
       
      </nav>
</div>
    );
}
export default Navbar