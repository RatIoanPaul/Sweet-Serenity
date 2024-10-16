import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.css';
import notificationImage from './bell.png';

const NavbarAdmin = () => {

    const handleClick = () => {
        alert('Notification button clicked!');
    };

    return (
        <nav className="navbar" >
            <div className="navbar-top">
                <div className="logo">Sweet Serenity</div>
                <button className="notification" onClick={handleClick}>
                    <img src={notificationImage} alt="Notification" />
                </button>

            </div>

            <div className="navbar-bottom">
                <ul className="nav-links">
                    <li className="nav-item active"><a href="#">Orders</a></li>
                    <li className="nav-item"><a href="#">Product Stock</a></li>
                    <li className="nav-item"><a href="#">Clients</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarAdmin;
