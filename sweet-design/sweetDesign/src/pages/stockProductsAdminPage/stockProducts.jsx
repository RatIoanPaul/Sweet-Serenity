import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styleStock.css';
import StockProductCard from "../../components/stockProductCard/stock.jsx";
import Navbar from "../../components/navbar/index.jsx";


const StockProducts = () => {
    const [products, setProducts] = useState([]); // Lista de produse active
    const [isLoading, setIsLoading] = useState(true);

    // Fetch produse active din backend
    const fetchProducts = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get('http://localhost:8080/api/in/stock_products/getAllStockProducts',
                {headers: {
                    Authorization: `Bearer ${token}`,
                }, });
            const activeProducts = response.data.data || [];
            setProducts(activeProducts);
            console.log(activeProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Funcție pentru actualizarea cantității stocului
    const updateStock = async (stockId, quantity) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `http://localhost:8080/api/in/stock_products/changeProductStock/${stockId}`,
                { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                }
            );
            console.log(`Stock for product ID ${stockId} updated successfully`);
            fetchProducts(); // Reîmprospătăm lista de produse
        } catch (error) {
            console.error('Error updating stock:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="stock-layout">
                {isLoading ? (
                    <p>Loading products...</p>
                ) : (
                    <div className="stock-grid">
                        {products.map((product) => (
                            <StockProductCard
                                key={product.id}
                                image={product.productImgUrl}
                                price={product.price}
                                name={product.name}
                                ingredients={product.ingredients}
                                initialStock={product.stockQuantity}
                                onIncrease={() => updateStock(product.id, product.stockQuantity + 1)}
                                onDecrease={() =>
                                    product.stockQuantity > 0 &&
                                    updateStock(product.id, product.stockQuantity - 1)
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default StockProducts;
