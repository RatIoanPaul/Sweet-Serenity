import React from 'react';
import './styleStock.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import StockProductCard from "../../components/stockProductCard/stock.jsx";
import Navbar from "../../components/navbar/index.jsx";

const allProducts = [
    { name: 'Chocolate Cake', imgSrc: cakeImage, price: '$10', ingredients: 'Chocolate, Flour, Sugar' },
    { name: 'Vanilla Cake', imgSrc: cakeImage, price: '$12', ingredients: 'Vanilla, Flour, Sugar' },
    { name: 'Red Velvet Cupcake', imgSrc: cupcakeImage, price: '$5', ingredients: 'Cocoa, Sugar, Butter' },
    { name: 'Chocolate Cupcake', imgSrc: cupcakeImage, price: '$6', ingredients: 'Chocolate, Sugar, Flour' },
    { name: 'Chocolate Cookie', imgSrc: cookieImage, price: '$3', ingredients: 'Butter, Sugar' },
    { name: 'Oatmeal Cookie', imgSrc: cookieImage, price: '$4', ingredients: 'Oats, Butter, Sugar' },
    { name: 'Candy', imgSrc: sweetsImage, price: '$2', ingredients: 'Sugar, Syrup, Flavoring' },
    { name: 'Lollipop', imgSrc: sweetsImage, price: '$3', ingredients: 'Sugar, Flavoring, Color' },
    { name: 'Chocolate Cupcake', imgSrc: cupcakeImage, price: '$6', ingredients: 'Chocolate, Sugar, Flour' },
    { name: 'Chocolate Cookieeee', imgSrc: cookieImage, price: '$3', ingredients: 'Butter, Sugar' },

];

const StockProducts = () => {
    return (
        <>
            <Navbar />
            <div className="stock-layout">
                <div className="stock-grid">
                    {allProducts.map((product, index) => (
                        <StockProductCard
                            key={index}
                            image={product.imgSrc}
                            price={product.price}
                            name={product.name}
                            ingredients={product.ingredients}
                            initialStock={10}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default StockProducts;
