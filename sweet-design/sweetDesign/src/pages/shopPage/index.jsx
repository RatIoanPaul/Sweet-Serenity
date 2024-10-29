import React, { useState } from 'react';
import './styles.css';
import cakeImage from './cake-image.jpeg';
import cupcakeImage from './cupcake-image.jpeg';
import cookieImage from './cookie-image.jpeg';
import sweetsImage from './sweets-image.jpeg';
import NavbarCart from '../../components/navbar-cart/index.jsx';
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
        { name: 'Lollipop', imgSrc: sweetsImage, price: '$3', ingredients: 'Sugar, Flavoring, Color', description: ' Tasty lollipops in various flavors Tasty lollipops in various flavors Tasty lollipops in various flavors Tasty lollipops in various flavors Tasty lollipops in various flavors' },
    ],
};

const Shop = () => {
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
            <NavbarCart />
            <div className="shop-layout">
                {currentCategory && (
                    <div className="shop-sidebar">
                        {categories.map((category, index) => (
                            <div className="shop-item" key={index}>
                                <button className="shop-button" onClick={() => handleCategoryClick(category.value)}>
                                    {category.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="shop-main">
                    {!currentCategory && (
                        <div className="shop-grid">
                            {categories.map((category, index) => (
                                <div className="shop-item" key={index}>
                                    <button className="shop-button" onClick={() => handleCategoryClick(category.value)}>
                                        <img src={category.imgSrc} alt={category.name} className="shop-image" />
                                        <div className="shop-caption">{category.name}</div>
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

export default Shop;
