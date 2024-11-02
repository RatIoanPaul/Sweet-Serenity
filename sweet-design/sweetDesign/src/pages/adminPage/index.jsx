import React from 'react';
import './styles.css';
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cupcake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import Navbar from "../../components/navbar/index.jsx";

const HomeAdmin = () => {
    const items = [
        { name: 'Cakes', imgSrc: cakeImage, link: '/cakes' },
        { name: 'Cupcakes', imgSrc: cupcakeImage, link: '/cupcakes' },
        { name: 'Cookies', imgSrc: cookieImage, link: '/cookies' },
        { name: 'Sweets', imgSrc: sweetsImage, link: '/sweets' }
    ];

    const handleClick = (link) => {
        window.location.href = link;
    };

    return (
        <>
            <Navbar />
            <div className="home-admin-container">
                <div className="grid-container">
                    {items.map((item, index) => (
                        <div className="grid-item" key={index}>
                            <button className="image-button" onClick={() => handleClick(item.link)}>
                                <img src={item.imgSrc} alt={item.name} className="item-image" />
                                <div className="item-caption">{item.name}</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomeAdmin;
