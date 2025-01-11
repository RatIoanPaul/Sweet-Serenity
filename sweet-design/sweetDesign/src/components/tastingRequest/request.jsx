import React, { useState } from 'react';
import './styleRequest.css';

const RequestCard = ({ tasting, requestNumber }) => {
    const { email, eventType, guestsNb, eventDate, phone } = tasting;
    const [message, setMessage] = useState("");

    const handleAccept = () => {

    };

    const handleDecline = () => {

    };

    return (
        <div className="admin-tasting-card-container">
            <div className="admin-tasting-card-header">
                <h2 className="request-header">Tasting request #{requestNumber}</h2>
            </div>
            <div className="admin-tasting-card-details-section">
                <div className="admin-tasting-card-info">
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Type of Event:</strong> {eventType}</p>
                    <p><strong>Number of Guests:</strong> {guestsNb}</p>
                    <p><strong>Event Date:</strong> {eventDate}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                </div>
                <div className="admin-tasting-card-actions">
                    <textarea
                        className="admin-tasting-card-message"
                        placeholder="Write a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="admin-tasting-card-buttons">
                        <button className="admin-tasting-card-accept" onClick={handleAccept}>
                            Accept request
                        </button>
                        <button className="admin-tasting-card-decline" onClick={handleDecline}>
                            Decline request
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestCard;
