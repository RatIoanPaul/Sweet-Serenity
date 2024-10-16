import React from 'react';
import './styles.css';
import cakeImage from './cake-image.jpeg';
import cupcakeImage from './cupcake-image.jpeg';
import cookieImage from './cookie-image.jpeg';
import sweetsImage from './sweets-image.jpeg';
import NavbarAdmin from '../../components/navbar-admin/index.jsx';

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
            <NavbarAdmin />
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
