import React from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesc.css';
import cartImage from "../navbar-cart/cart.png";

const NavbarCart = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cart');
    };

    return (
        <nav className="cart-navbar">
            <div className="cart-navbar-top">
                <div className="cart-logo">Sweet Serenity</div>
                <div className="cart-user-actions">
                    <button className="cart-notification" onClick={handleClick}>
                        <img src={cartImage} alt="Notification"/>
                    </button>
                </div>
            </div>

            <div className="cart-navbar-bottom">
                <ul className="cart-nav-links">
                    <li className="cart-nav-item active"><a href="/">Home</a></li>
                    <li className="cart-nav-item"><a href="/shop">Shop</a></li>
                    <li className="cart-nav-item"><a href="/services">Services</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarCart;
