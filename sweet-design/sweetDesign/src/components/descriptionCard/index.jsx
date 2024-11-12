import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './styleDescription.css';
import Popup from "../popUp/pop.jsx";
import axios from 'axios';
import { isTokenValid, parseJwt } from "../../utils/authService.jsx";

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token && isTokenValid(token);
};

const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        return decodedToken.role;
    }
    return null;
};

const getUserEmail = () => {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = parseJwt(token);
        return decodedToken.email; // Presupunem că email-ul este stocat în token
    }
    return null;
};

const DescriptionCard = ({ image, productName, description, ingredients, allergy, price, productId }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isCommandPage = location.pathname === '/command';
    const isEventsPage = location.pathname === '/events';
    const isShopPage = location.pathname === '/shop';

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const userRole = getUserRole();
    const userEmail = getUserEmail();

    const addToCart = async () => {
        if (isAuthenticated() && userRole === 'CUSTOMER') {
            try {
                await axios.post('http://localhost:8080/api/in/user/cart/addProductToCart', {
                    productId: productId,
                    quantity: 1, // Cantitatea implicită este 1
                    userEmail: userEmail
                });
                setPopupMessage("Product added to cart successfully!");
            } catch (error) {
                console.error("Error adding product to cart:", error);
                setPopupMessage("Failed to add product to cart. Please try again.");
            }
            setIsPopupVisible(true);
        } else {
            setPopupMessage("Sign in to your account to add products to the cart!");
            setIsPopupVisible(true);
        }
    };

    const handleButtonClick = (message, path) => {
        if (isCommandPage) {
            navigate(path);
        } else {
            addToCart();
        }
    };

    const handleClosePopup = () => {
        setIsPopupVisible(false);
    };

    return (
        <div className="description-card-container">
            <div className="description-card-image-background">
                <img src={image} alt={productName} className="description-card-product-image" />

                {isCommandPage ? (
                    <button
                        className="description-card-preorder-btn"
                        onClick={() => handleButtonClick("Sign in to your account to preorder products!", "/list")}>
                        Preorder Now
                    </button>
                ) : isEventsPage ? (
                    <button
                        className="description-card-book-event-btn"
                        onClick={() => handleButtonClick("Sign in to your account to add products to favourites!", "/favourites")}>
                        Add to favourites
                    </button>
                ) : (
                    <button
                        className="description-card-add-to-cart-btn"
                        onClick={addToCart}>
                        Add to cart
                    </button>
                )}
            </div>

            <div className="description-card-details-section">
                <h2 className="description-card-product-name">{productName}</h2>
                <p className="description-card-product-description">{description}</p>

                <h4 className="description-card-section-title">Ingredients:</h4>
                <p className="description-card-product-ingredients">{ingredients}</p>

                <h4 className="description-card-section-title">Allergy Information:</h4>
                <p className="description-card-allergy-info">{allergy}</p>

                <h4 className="description-card-section-title">Pricing: <span className="description-card-product-price">{price}</span></h4>
            </div>

            <Popup isVisible={isPopupVisible} onClose={handleClosePopup} message={popupMessage} />
        </div>
    );
};

export default DescriptionCard;
