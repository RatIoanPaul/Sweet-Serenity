import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './styleShow.css';

const ProductShow = ({ name, description, price, image }) => {
    const [quantity, setQuantity] = useState(1);
    const location = useLocation();

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="ps-container">
            <div className="ps-image">
                <img src={image} alt={name} />
            </div>
            <div className="ps-details">
                <h2 className="ps-name">{name}</h2>
                <p className="ps-description">{description}</p>

                {location.pathname !== '/favourites' && (
                    <div className="ps-notes">
                        <textarea
                            id="notes"
                            placeholder="Add any additional notes here..."
                            rows="3"
                        ></textarea>
                    </div>
                )}
            </div>
            <div className="ps-price-section">
                <p className="ps-price">{price} Lei</p>
                <div className="ps-quantity">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>
                <div className="ps-buttons">
                    <a href="#" className="ps-remove">Delete product</a>
                </div>
            </div>
        </div>
    );
};

export default ProductShow;
