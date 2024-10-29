import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importă useNavigate
import './styleServices.css';
import NavbarCart from '../../components/navbar-cart/index.jsx';
import tastingImage from './tastings.jpeg';
import eventImage from './events.jpeg';

const Services = () => {
    const navigate = useNavigate();

    const handleTastingClick = () => {
        console.log("Tasting clicked!");
        navigate('/tastings');
    };

    const handleEventClick = () => {
        console.log("Event clicked!");
        navigate('/events');
    };

    return (
        <>
            <NavbarCart />
            <div className="services-container">
                <div className="services-grid">
                    <div className="services-item">
                        <button className="services-button" onClick={handleTastingClick}>
                            <img src={tastingImage} alt="Tastings" className="services-image" />
                            <div className="services-caption">Tastings</div>
                        </button>
                    </div>
                    <div className="services-item">
                        <button className="services-button" onClick={handleEventClick}>
                            <img src={eventImage} alt="Events" className="services-image" />
                            <div className="services-caption">Events</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Services;
