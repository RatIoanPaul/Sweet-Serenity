import React, { useState } from 'react';
import './styleEvents.css';
import wed from '../../images/wedding.jpeg';
import birth from '../../images/birthday.jpeg';
import bapt from '../../images/baptizing.jpeg';
import rec from '../../images/reception.jpeg';
import Navbar from "../../components/navbar/index.jsx";
import ProductCard from "../../components/productCard/index.jsx";
import DescriptionCard from "../../components/descriptionCard/index.jsx";

// Define events with specific products for each event
const eventProducts = {
    wedding: [
        { name: 'Wedding Cake', imgSrc: wed, price: '$300', ingredients: 'Flour, Sugar, Butter', description: 'Elegant wedding cake with custom designs' },
        { name: 'Cupcake Tower', imgSrc: wed, price: '$150', ingredients: 'Chocolate, Vanilla, Frosting', description: 'An assortment of cupcakes for wedding guests' },
    ],
    birthday: [
        { name: 'Birthday Cake', imgSrc: birth, price: '$50', ingredients: 'Sugar, Eggs, Milk', description: 'Customizable birthday cake for all ages' },
        { name: 'Party Favors', imgSrc: birth, price: '$25', ingredients: 'Candy, Toys', description: 'Special gift bags for party guests' },
    ],
    baptizing: [
        { name: 'Baptizing Cake', imgSrc: bapt, price: '$80', ingredients: 'Buttercream, Eggs', description: 'Simple and elegant cake for baptisms' },
        { name: 'Cookies', imgSrc: bapt, price: '$20', ingredients: 'Butter, Sugar', description: 'Decorative cookies for guests' },
    ],
    reception: [
        { name: 'Reception Platter', imgSrc: rec, price: '$200', ingredients: 'Cheese, Crackers, Fruits', description: 'A selection of platters for receptions' },
        { name: 'Mini Desserts', imgSrc: rec, price: '$60', ingredients: 'Various desserts', description: 'An assortment of mini desserts for receptions' },
    ]
};

const Events = () => {
    const [currentEvent, setCurrentEvent] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const events = [
        { name: 'Wedding', value: 'wedding', imgSrc: wed },
        { name: 'Birthday Party', value: 'birthday', imgSrc: birth },
        { name: 'Baptizing', value: 'baptizing', imgSrc: bapt },
        { name: 'Reception', value: 'reception', imgSrc: rec }
    ];

    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setSelectedProduct(null);
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    return (
        <>
            <Navbar />
            <div className="events-layout">
                {currentEvent && (
                    <div className="events-sidebar">
                        {events.map((event, index) => (
                            <div className="event-item" key={index}>
                                <button className="event-button" onClick={() => handleEventClick(event.value)}>
                                    {event.name}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="events-main">
                    {!currentEvent && (
                        <div className="events-grid">
                            {events.map((event, index) => (
                                <div className="event-item" key={index}>
                                    <button className="event-button" onClick={() => handleEventClick(event.value)}>
                                        <img src={event.imgSrc} alt={event.name} className="event-image" />
                                        <div className="event-caption">{event.name}</div>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {currentEvent && !selectedProduct && (
                        <div className="product-grid">
                            {eventProducts[currentEvent].map((product, index) => (
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

export default Events;
