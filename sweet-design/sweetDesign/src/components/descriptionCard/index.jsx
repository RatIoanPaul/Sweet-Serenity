import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './styleDescription.css';
import Popup from "../popUp/pop.jsx";
import { isTokenValid, parseJwt } from "../../utils/authService.jsx";

/* aceasta componenta se afla pe paginile de comanda,
* de precomanda si de evenimente pt a descrie produsele existente pe paginile respective si are
* buton diferit in functie de pagina pe care se afla*/
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

const DescriptionCard = ({ image, productName, description, ingredients, allergy, price }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isCommandPage = location.pathname === '/command';
    const isEventsPage = location.pathname === '/events';

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const userRole = getUserRole();

    const handleButtonClick = (message, path) => {
        if (isAuthenticated() && userRole === 'CUSTOMER') {
            navigate(path);
            {/*aici se va trimite o componenta productShow cu parametrii sai pe pagina corespunzatoare
            paginii pe care se afla butonul; deci daca butonul se afla de ex pe pagina de comanda(shop),
            componenta va fi trimisa pe pagina cosului*/}
        } else {
            setPopupMessage(message);
            setIsPopupVisible(true);
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
                        onClick={() => handleButtonClick("Sing in to your account to add products to favourites!", "/favourites")}>
                        Add to favourites
                    </button>
                ) : (
                    <button
                        className="description-card-add-to-cart-btn"
                        onClick={() => handleButtonClick("Sign in to your account to add products to the cart!", "/cart")}>
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
