import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styleTotal.css';

const Total = ({ productCost, totalPrice, page }) => {
    const navigate = useNavigate();

    let message;
    let buttonText;

    switch (page) {
        case 'favourites':
            message = "Remember, you can remove items from your favourites anytime.";
            buttonText = "Save favourites";
            break;
        case 'list':
            message = "You need to specify the date for your preorder's arrival.";
            buttonText = "Place preorder";
            break;
        case 'checkout':
        default:
            message = "Please note: Your order must be picked up within 24 hours.";
            buttonText = "Place Order";
            break;
    }

    const handleButtonClick = () => {
        if (buttonText === "Place preorder") {
            navigate('/sendPreorder');
        } else if (buttonText === "Place Order") {
            navigate('/sendOrder');
        }
    };

    return (
        <div className="total-container">
            <h1 className="header">Summary</h1>
            <p className="text">Products cost: {productCost}</p>
            <p className="text2">{message}</p>
            <p className="total">Total: {totalPrice}</p>
            <button className="button" onClick={handleButtonClick}>{buttonText}</button>
        </div>
    );
};

export default Total;
