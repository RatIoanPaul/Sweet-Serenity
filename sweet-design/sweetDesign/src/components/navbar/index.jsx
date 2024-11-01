import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
    const navigate = useNavigate();  // React Router's navigate function

    return (
        <nav className="navbar">
            <div className="navbar-top">
                <div className="logo">Sweet Serenity</div>
                <div className="user-actions">
                    <button className="sign-in" onClick={() => navigate('/signin')}>
                        Sign in
                    </button>
                    <button className="register" onClick={() => navigate('/register')}>
                        Register
                    </button>
                </div>
            </div>

            <div className="navbar-bottom">
                <ul className="nav-links">
                    <li className="nav-item active"><a href="/">Home</a></li>
                    <li className="nav-item"><a href="/shop">Shop</a></li>
                    <li className="nav-item"><a href="/services">Services</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;