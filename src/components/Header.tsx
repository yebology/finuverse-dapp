import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="header">
            <Link to="/" className="logo">
                Finuverse
            </Link>
            <nav className="nav-links">
                <Link to="/courses">Courses</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
};

export default Header;