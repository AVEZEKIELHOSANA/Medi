import React from "react";
import {Link} from "react-router-dom"
import {Search} from 'lucide-react'

function Navbar(){
    return(
<div>
<nav className="navbar">
        <div className="logo"><strong><img src="./src/assets/logo.png" alt="LOGO"/>MEDIFINDER</strong></div>
        <div className="search">
        <Link to="/search"><button><Search/></button></Link><input type="text" className="search-input" />
        </div>
        <ul className="nav-links">
          <li><Link to="./Home">Home</Link></li>
          
<li><Link to="/hospital">Medical facility</Link></li>
          
          
          <Link to="/Login"><button>Login</button></Link>
          
          
          <Link to="/Signup"> <button> Sign Up </button></Link>
        </ul>
       
      </nav>
</div>
    );
}
export default Navbar