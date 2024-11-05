import React from 'react';
import './styleCheckout.css';
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import cake from "../../images/cake-image.jpeg";
import Total from "../../components/totalCard/total.jsx";

const Checkout = () => {
    return (
        <>
            <Navbar />
            <div className="checkout-container">
                <h1 className="checkout-title">Your Cart</h1>
                <div className="checkout-items">
                    <div className="checkout-products">
                        <ProductShow
                            name="Vanilla cake"
                            description="Classic vanilla cake with a soft texture"
                            price="319.96"
                            image={cake}
                        />
                        <ProductShow
                            name="Vanilla cake"
                            description="Classic vanilla cake with a soft texture"
                            price="319.96"
                            image={cake}
                        />
                    </div>
                    <div className="total-card">
                        <Total
                            productCost="$50"
                            totalPrice="$55"
                            page="checkout"
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default Checkout;
