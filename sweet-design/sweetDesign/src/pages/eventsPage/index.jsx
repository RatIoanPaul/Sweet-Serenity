import React from 'react';
import './styleEvents.css';
import wed from './wedding.jpeg';
import birth from './birthday.jpeg';
import bapt from './baptizing.jpeg';
import rec from './reception.jpeg';
import NavbarCart from "../../components/navbar-cart/index.jsx";

const Events = () => {
    const items = [
        { name: 'Wedding', imgSrc: wed, link: '/wedding' },
        { name: 'Birthday Party', imgSrc: birth, link: '/birthday' },
        { name: 'Baptizing', imgSrc: bapt, link: '/baptizing' },
        { name: 'Reception', imgSrc: rec, link: '/reception' }
    ];

    const handleClick = (link) => {
        window.location.href = link;
    };

    return (
        <>
            <NavbarCart />
            <div className="event-container">
                <div className="event-grid-container">
                    {items.map((item, index) => (
                        <div className="event-grid-item" key={index}>
                            <button className="event-image-button" onClick={() => handleClick(item.link)}>
                                <img src={item.imgSrc} alt={item.name} className="event-item-image" />
                                <div className="event-item-caption">{item.name}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Events;
