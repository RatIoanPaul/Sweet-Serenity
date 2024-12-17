import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styleNavbar.css';
import { isTokenValid, parseJwt } from "../../utils/authService.jsx";
import cartImage from "../../images/cart.png";
import notificationImage from "../../images/bell.png";
import listIcon from "../../images/commandList.png";
import fav from "../../images/favourites.png";
import profile from "../../images/profile.png";

const Navbar = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && isTokenValid(token)) {
            const decodedToken = parseJwt(token);
            setUserRole(decodedToken.role);
        }
    }, []);

    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <nav className="navbar">
            <div className="navbar-bottom">
                <div className="logo">Sweet Serenity</div>
                {(userRole === "CUSTOMER" || !userRole) && (
                    <ul className="nav-links">
                        <li className="nav-item active"><a href="/">Home</a></li>
                        <li className="nav-item"><a href="/shop">Shop</a></li>
                        <li className="nav-item"><a href="/command">Preorders</a></li>
                        <li className="nav-item"><a href="/services">Services</a></li>
                    </ul>
                )}

                {userRole === "ADMIN" && (
                    <ul className="nav-links">
                        <li className="nav-item active"><a href="/ordersAdmin">Orders</a></li>
                        <li className="nav-item"><a href="/preordersAdmin">Preorders</a></li>
                        <li className="nav-item"><a href="/productsAdmin">Products</a></li>
                        <li className="nav-item"><a href="/stockProducts">Stock products</a></li>
                        <li className="nav-item"><a href="#">Clients</a></li>
                        <li className="nav-item"><button className="nav-item" onClick={handleLogout}>Log out</button></li>
                    </ul>
                )}

                <div className="user-actions">
                    {!userRole && (
                        <>
                            <button className="sign-in" onClick={() => navigate('/signin')}>
                                Sign in
                            </button>
                            <button className="register" onClick={() => navigate('/register')}>
                                Register
                            </button>
                        </>
                    )}

                    {userRole === "CUSTOMER" && (
                        <>

                            <button className="favourites" onClick={() => navigate('/favourites')}>
                                <img src={fav} alt="fav"/>
                            </button>


                            <button className="command-list" onClick={() => navigate('/list')}>
                                <img src={listIcon} alt="list"/>
                            </button>

                            <button className="cart-notification" onClick={() => navigate('/cart')}>
                                <img src={cartImage} alt="Cart"/>
                            </button>

                            <button className="profile" onClick={() => navigate('/profile')}>
                                <img src={profile} alt="Profile"/>
                            </button>


                        </>

                    )}
                    {userRole === "ADMIN" && (
                        <button className="notification" onClick={() => navigate('/notifications')}>
                        <img src={notificationImage} alt="Notification"/>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );

};

export default Navbar;
