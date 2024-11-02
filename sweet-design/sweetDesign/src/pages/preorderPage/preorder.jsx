import React, { useState } from 'react';
import './stylePreorder.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCard from "../../components/productCard/index.jsx";
import DescriptionCard from "../../components/descriptionCard/index.jsx";

const allProducts = {
    cakes: [
        { name: 'Chocolate Cake', imgSrc: cakeImage, price: '$10', ingredients: 'Chocolate, Flour, Sugar', description: 'Delicious chocolate cake with rich flavor' },
        { name: 'Vanilla Cake', imgSrc: cakeImage, price: '$12', ingredients: 'Vanilla, Flour, Sugar', description: 'Classic vanilla cake with a soft texture' },
    ],
    cupcakes: [
        { name: 'Red Velvet Cupcake', imgSrc: cupcakeImage, price: '$5', ingredients: 'Cocoa, Sugar, Butter', description: 'Moist red velvet cupcakes with cream cheese frosting' },
        { name: 'Chocolate Cupcake', imgSrc: cupcakeImage, price: '$6', ingredients: 'Chocolate, Sugar, Flour', description: 'Rich chocolate cupcakes with a smooth texture' },
    ],
    cookies: [
        { name: 'Chocolate Cookie', imgSrc: cookieImage, price: '$3', ingredients: 'Butter, Sugar', description: 'Chewy chocolate cookies with a gooey center' },
        { name: 'Oatmeal Cookie', imgSrc: cookieImage, price: '$4', ingredients: 'Oats, Butter, Sugar', description: 'Hearty oatmeal cookies with a soft crunch' },
    ],
    sweets: [
        { name: 'Candy', imgSrc: sweetsImage, price: '$2', ingredients: 'Sugar, Syrup, Flavoring', description: 'Sweet, colorful candies' },
        { name: 'Lollipop', imgSrc: sweetsImage, price: '$3', ingredients: 'Sugar, Flavoring, Color', description: 'Tasty lollipops in various flavors' },
    ],
};

const Preorder = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const categories = [
        { name: 'Cakes', value: 'cakes', imgSrc: cakeImage },
        { name: 'Cupcakes', value: 'cupcakes', imgSrc: cupcakeImage },
        { name: 'Cookies', value: 'cookies', imgSrc: cookieImage },
        { name: 'Sweets', value: 'sweets', imgSrc: sweetsImage }
    ];

    const handleCategoryClick = (category) => {
        setCurrentCategory(category);
        setSelectedProduct(null);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (
        <>
            <Navbar />
            <div className="preorder-layout">
                {currentCategory && (
                    <div className="preorder-sidebar">
                        {categories.map((category, index) => (
                            <div className="preorder-item" key={index}>
                                <button className="preorder-button" onClick={() => handleCategoryClick(category.value)}>
                                    {category.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="preorder-main">
                    {!currentCategory && (
                        <div className="preorder-grid">
                            {categories.map((category, index) => (
                                <div className="preorder-item" key={index}>
                                    <button className="preorder-button" onClick={() => handleCategoryClick(category.value)}>
                                        <img src={category.imgSrc} alt={category.name} className="preorder-image" />
                                        <div className="preorder-caption">{category.name}</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {currentCategory && !selectedProduct && (
                        <div className="product-grid">
                            {allProducts[currentCategory].map((product, index) => (
                                <ProductCard
                                    key={index}
                                    image={product.imgSrc}
                                    price={product.price}
                                    name={product.name}
                                    ingredients={product.ingredients}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    )}

                    {selectedProduct && (
                        <DescriptionCard
                            image={selectedProduct.imgSrc}
                            productName={selectedProduct.name}
                            description={selectedProduct.description}
                            ingredients={selectedProduct.ingredients}
                            price={selectedProduct.price}
                            allergy="Contains gluten and dairy"
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default Preorder;
