import React, { useState, useEffect } from 'react';
import './styleRequestAdmin.css';
import Navbar from "../../components/navbar/index.jsx";
import RequestCard from "../../components/tastingRequest/request.jsx";

const RequestAdmin = () => {
    const [tastings, setTastings] = useState([
        {
            email: "example1@gmail.com",
            eventType: "Wedding",
            guestsNb: 150,
            eventDate: "2025-01-30",
            phone: "+123456789",
        },
        {
            email: "example2@yahoo.com",
            eventType: "Birthday Party",
            guestsNb: 50,
            eventDate: "2025-02-15",
            phone: "+987654321",
        },
        {
            email: "example3@gmail.com",
            eventType: "Corporate Event",
            guestsNb: 200,
            eventDate: "2025-03-01",
            phone: "+1122334455",
        },
    ]);

    useEffect(() => {
    }, []);

    return (
        <>
            <Navbar />
            <div className="request-list">
                {tastings.map((tasting, index) => (
                    <RequestCard
                        key={index}
                        tasting={tasting}
                        requestNumber={index + 1}
                    />
                ))}
            </div>
        </>
    );
};

export default RequestAdmin;
