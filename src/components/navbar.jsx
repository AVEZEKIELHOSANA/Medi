import React from "react";
import {Link} from "react-router-dom"

function Navbar(){
    return(
<div>
<nav className="navbar">
    <ul>
        <li>
            <Link to="/Home"> Home </Link>
        </li>
        <li>
            <Link to="/pharmacy"> Pharmacies </Link>
        </li>
        <li>
            <Link to="/Search"> Search pharmacy</Link>
        </li>
        <li>
            <Link to="/userAccount">
                My account
            </Link>
        </li>
    </ul>
</nav>
</div>
    );
}
export default Navbar