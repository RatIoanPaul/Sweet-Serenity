import React from 'react';
import PropTypes from 'prop-types'; // Importă PropTypes pentru validare
import './styleCheckout.css';
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import Total from "../../components/totalCard/total.jsx";

const Checkout = ({ cartItems }) => {
    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <h1 className="checkout-title">Your Cart</h1>
                <div className="checkout-items">
                    <div className="checkout-products">
                        {cartItems && cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <ProductShow
                                    key={index}
                                    name={item.productName}
                                    description={item.description}
                                    price={(item.price * (item.quantity || 1)).toFixed(2)} // Folosește `quantity` dacă există
                                    image={item.imageUrl || 'path/to/default/image.jpg'} // Folosește `imageUrl` sau o imagine implicită
                                />
                            ))
                        ) : (
                            <p className="no-items-message">No items in your cart.</p>
                        )}
                    </div>
                    {cartItems && cartItems.length > 0 && (
                        <div className="total-card">
                            <Total
                                productCost="$50"
                                totalPrice="$55"
                                page="checkout"
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// Adaugă PropTypes pentru validare
Checkout.propTypes = {
    cartItems: PropTypes.arrayOf(
        PropTypes.shape({
            productName: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number,
            imageUrl: PropTypes.string
        })
    ).isRequired
};

export default Checkout;
