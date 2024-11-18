import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./styleShow.css";

const ProductShow = ({
                         productCart,
                         name,
                         description,
                         price,
                         image,
                         quantity,
                         onDelete,
                         onIncrement,
                         onDecrement,
                     }) => {
    const location = useLocation();

    return (
        <div className="ps-container">
            <div className="ps-image">
                <img src={image} alt={name} />
            </div>
            <div className="ps-details">
                <h2 className="ps-name">{name}</h2>
                <p className="ps-description">{description}</p>
                {location.pathname !== "/favourites" && (
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
                <p className="ps-price">{(price * quantity).toFixed(2)} Lei</p>
                <div className="ps-quantity">
                    <button onClick={() => onDecrement(productCart)} disabled={quantity <= 1}>
                        -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => onIncrement(productCart)}>+</button>
                </div>
                <div className="ps-buttons">
                    <button className="ps-remove" onClick={() => onDelete(productCart.productCartId)}>
                        Delete product
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductShow.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
};

export default ProductShow;
