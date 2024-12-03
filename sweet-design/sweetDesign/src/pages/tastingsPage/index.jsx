import React from 'react';
import './styleTasting.css';
import Navbar from "../../components/navbar/index.jsx";

const TastingsPage = () => {
    return (
        <>
            <Navbar/>
            <div className="taste-container">
                <div className="taste-box">
                    <h2 className="taste-header">Tasting request</h2>
                    <form className="taste-form">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="Email" />
                        </div>

                        <div>
                            <label htmlFor="eventType">Type of Event:</label>
                            <input type="text" id="eventType" placeholder="Type of Event" />
                        </div>

                        <div>
                            <label htmlFor="guestsNb">Guests Number:</label>
                            <input type="number" id="guestsNb" placeholder="Number of Guests" />
                        </div>

                        <div>
                            <label htmlFor="eventDate">Event Date:</label>
                            <input type="date" id="eventDate" />
                        </div>

                        <div>
                            <label htmlFor="phone">Phone Number:</label>
                            <input type="tel" id="phone" placeholder="Phone Number" />
                        </div>

                        <button type="submit" className="taste-button">Submit Request</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default TastingsPage;
