import React, { useState, useEffect } from 'react';
import './styles.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCard from "../../components/productCard/index.jsx";
import DescriptionCard from "../../components/descriptionCard/index.jsx";
import axios from 'axios';

const Shop = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Definirea categoriilor generale și imaginilor asociate
    const categories = [
        { name: 'Cakes', value: 'CAKE', imgSrc: cakeImage },
        { name: 'Cupcakes', value: 'CUPCAKE', imgSrc: cupcakeImage },
        { name: 'Cookies', value: 'COOKIE', imgSrc: cookieImage },
        { name: 'Sweets', value: 'GENERAL', imgSrc: sweetsImage }
    ];

    // Funcția pentru selectarea imaginii potrivite în funcție de categorie
    const getImageForCategory = (category) => {
        switch (category) {
            case "CAKE":
                return cakeImage;
            case "CUPCAKE":
                return cupcakeImage;
            case "COOKIE":
                return cookieImage;
            default:
                return sweetsImage;
        }
    };

    // Funcția pentru a obține produsele de la API la montarea componentei
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/in/products/getProducts`);
                console.log("Produse obținute de la API:", response.data.data);
                setProducts(response.data.data); // Stocăm toate produsele
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Când se selectează o categorie generală
    const handleCategoryClick = (categoryValue) => {
        setCurrentCategory(categoryValue);  // Setează categoria selectată
        setSelectedProduct(null);           // Resetează produsul selectat

        // Filtrează produsele din baza de date pentru categoria selectată
        const filtered = products.filter(product =>
            product.productCategory?.trim().toUpperCase() === categoryValue
        );
        setFilteredProducts(filtered); // Stocăm produsele filtrate pentru afișare
    };

    // Selectarea unui produs specific
    const handleProductClick = (product) => {
        setSelectedProduct(product);   // Setează produsul selectat
        console.log(product)
    };

    return (
        <>
            <Navbar />
            <div className="delivery-notice">
                <p>All products are delivered within 24 hours. If you'd like a different delivery date, please place a preorder.</p>
            </div>
            <div className="shop-layout">

                {/* Meniul lateral pentru selectarea categoriilor de filtre (vizibil doar dacă o categorie a fost selectată) */}
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
                    {/* Afișează grila de categorii generale dacă nu este selectată nicio categorie */}
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

                    {/* Afișează produsele din categoria selectată */}
                    {currentCategory && !selectedProduct && (
                        <div className="product-grid">
                            {filteredProducts.map((product, index) => (
                                <ProductCard
                                    key={index}
                                    image={getImageForCategory(product.productCategory)}
                                    price={product.price}
                                    name={product.name}
                                    ingredients={product.ingredients}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Mesaj dacă nu există produse în categoria selectată */}
                    {currentCategory && filteredProducts.length === 0 && (
                        <div className="no-products-message-container">
                            <p className="no-products-message">Niciun produs disponibil pentru această categorie.</p>
                        </div>
                    )}

                    {/* Afișează detaliile produsului selectat */}
                    {selectedProduct && (
                        <DescriptionCard
                            image={getImageForCategory(selectedProduct.productCategory)}
                            productId={selectedProduct.id}
                            productName={selectedProduct.name}
                            description={selectedProduct.descriptions}
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