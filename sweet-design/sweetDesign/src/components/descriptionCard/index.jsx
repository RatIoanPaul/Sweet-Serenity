import React from "react";
import './styleDescription.css';

const DescriptionCard = ({ image, productName, description, ingredients, allergy, price }) => {
    return (
        <div className="description-card-container">
            <div className="description-card-image-background">
                <img src={image} alt={productName} className="description-card-product-image" />
                <button className="description-card-add-to-cart-btn">Add to cart</button>
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
        </div>
    );
};

export default DescriptionCard;
