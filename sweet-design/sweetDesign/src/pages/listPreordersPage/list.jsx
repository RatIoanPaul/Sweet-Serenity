import React from 'react';
import './styleList.css';
import Navbar from "../../components/navbar/index.jsx";
import ProductShow from "../../components/productShow/product.jsx";
import cake from "../../images/cake-image.jpeg";
import Total from "../../components/totalCard/total.jsx";

const List = () => {
    return (
        <>
            <Navbar/>
            <div className="list-container">
                <h1 className="list-title">Your preorders</h1>
                <div className="list-items">
                    <div className="list-products">
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
                    <div className="list-total">
                        <Total
                            productCost="$50"
                            totalPrice="$55"
                            page="list"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default List;
