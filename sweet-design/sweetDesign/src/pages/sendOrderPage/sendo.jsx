import React, { useState } from 'react';
import './styleSendO.css';
import Navbar from "../../components/navbar/index.jsx";
import { useNavigate } from 'react-router-dom';

const SendOrder = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [addressType, setAddressType] = useState("existing");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // Adăugăm state pentru numărul de telefon
    const [addresses, setAddresses] = useState([
        "Timisoara",
        "Arad",
        "Honolulu"
    ]);

    const navigate = useNavigate();

    const handleDeliveryMethodChange = (event) => {
        const method = event.target.value;
        setDeliveryMethod(method);
        setDeliveryCost(method === "delivery" ? 10 : 0);
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };

    const handleSaveNewAddress = () => {
        if (newAddress && !addresses.includes(newAddress)) {
            setAddresses([...addresses, newAddress]);
            setNewAddress("");
            setAddressType("existing");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Order submitted to address: ${addressType === "new" ? newAddress : selectedAddress}, Phone: ${phoneNumber}`);
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <div className="send-order-container">
                <div className="send-order-box">
                    <h2 className="send-order-header">Order Details</h2>
                    <form className="send-order-form" onSubmit={handleSubmit}>
                        <div className="order-form-group">
                            <label htmlFor="deliveryMethod">Delivery Method:</label>
                            <select
                                id="deliveryMethod"
                                value={deliveryMethod}
                                onChange={handleDeliveryMethodChange}
                            >
                                <option value="pickup">Pickup</option>
                                <option value="delivery">Home Delivery</option>
                            </select>
                        </div>

                        {deliveryMethod === "delivery" && (
                            <p className="order-delivery-cost">Delivery Cost: ${deliveryCost}</p>
                        )}

                        <div className="order-form-group">
                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        {deliveryMethod === "delivery" && (
                            <>
                                <div className="order-form-group">
                                    <label>Address:</label>
                                    <select
                                        value={addressType}
                                        onChange={(e) => setAddressType(e.target.value)}
                                    >
                                        <option value="existing">Use Existing Address</option>
                                        <option value="new">Enter New Address</option>
                                    </select>
                                </div>

                                {addressType === "existing" && (
                                    <div className="order-existing-addresses">
                                        {addresses.map((address, index) => (
                                            <div key={index} className="order-address-option">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAddress === address}
                                                    onChange={() => handleAddressSelect(address)}
                                                />
                                                <label className="order-address-label">{address}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {addressType === "new" && (
                                    <div className="order-form-group">
                                        <label htmlFor="newAddress">New Address:</label>
                                        <input
                                            type="text"
                                            id="newAddress"
                                            placeholder="Enter your new address"
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="order-save-address-button"
                                            onClick={handleSaveNewAddress}
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button type="submit" className="order-submit-button">Submit Order</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendOrder;
