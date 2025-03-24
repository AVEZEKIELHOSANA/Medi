import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';

function Navbar() {
    const [search, setSearch] = useState('');
    const [isActive, setIsActive] = useState(false);

    // Toggle the menu on small screens
    const handleMenuClick = () => {
        setIsActive(!isActive); // Toggle the menu state
    };

    return (
        <div>
            <nav className="navbar">
                {/* Logo */}
                <div className="logo">
                    <strong>
                        <img src="./src/assets/logo.png" alt="LOGO" />
                        MEDIFINDER
                    </strong>
                </div>

                {/* Search Bar (Visible on Big Screens) */}
                <div className="search">
                    <input
                        placeholder="Search"
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-input"
                    />
                    <Link to="/search" className="search-button">
                        <button>
                            <Search id="search-icon" />
                        </button>
                    </Link>
                </div>

                {/* Menu Button (Visible on Small Screens) */}
                <button onClick={handleMenuClick} className="menu-button">
                    <Menu />
                </button>

                {/* Nav Links (Visible on Big Screens) */}
                <ul className="nav-links">
                    <li>
                        <Link to="/landing">Home</Link>
                    </li>
                    <li>
                        <Link to="/hospital">Medical Facility</Link>
                    </li>
                    <li>
                        <Link to="/login">
                            <button id="log">Login</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/signup">
                            <button id="sign">SignUp</button>
                        </Link>
                    </li>
                </ul>

                {/* Dropdown Menu (Visible on Small Screens) */}
                {isActive && (
                    <ul className="dropdown-menu" >
                        <li>
                            <Link to="/landing">Home</Link>
                        </li>
                        <li>
                            <Link to="/hospital">Medical Facility</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link> {/* Search as a nav link */}
                        </li>
                        <li>
                            <Link to="/login">
                                <button id="log">Login</button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/signup">
                                <button id="sign">SignUp</button>
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
}

export default Navbar;