import React from 'react';
import './styleFavourites.css';
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import cake from "../../images/cake-image.jpeg";
import Total from "../../components/totalCard/total.jsx";

const Favourites = () => {
    return (
        <>
            <Navbar/>
            <div className="favourites-container">
                <h1 className="favourites-title">Your favourites</h1>
                <div className="favourites-items">
                    <div className="favourites-products">
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
                    <div className="favourites-total">
                        <Total
                            productCost="$50"
                            totalPrice="$55"
                            page="favourites"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Favourites;
