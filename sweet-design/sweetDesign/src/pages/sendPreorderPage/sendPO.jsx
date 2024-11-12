import React, { useState } from 'react';
import './stylePo.css';
import Navbar from "../../components/navbar/index.jsx";
import { useNavigate } from 'react-router-dom';

const SendPreorder = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [preorderDate, setPreorderDate] = useState("");
    const [addressType, setAddressType] = useState("existing");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // State pentru numărul de telefon
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
        alert(`Preorder submitted to address: ${addressType === "new" ? newAddress : selectedAddress}, Phone: ${phoneNumber}`);
        navigate("/");
    };

    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + 1);

    const formattedToday = today.toISOString().split("T")[0];
    const formattedMaxDate = maxDate.toISOString().split("T")[0];

    return (
        <>
            <Navbar />
            <div className="send-preorder-container">
                <div className="send-preorder-box">
                    <h2 className="send-preorder-header">Preorder Details</h2>
                    <form className="send-preorder-form" onSubmit={handleSubmit}>
                        <div className="form-group">
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
                            <p className="delivery-cost">Delivery Cost: ${deliveryCost}</p>
                        )}

                        <div className="form-group">
                            <label htmlFor="preorderDate">Preorder Date:</label>
                            <input
                                type="date"
                                id="preorderDate"
                                value={preorderDate}
                                onChange={(e) => setPreorderDate(e.target.value)}
                                min={formattedToday}
                                max={formattedMaxDate}
                            />
                            <p className="date-restriction-message">
                                You can only select a date within one month from today.
                            </p>
                        </div>

                        <div className="form-group">
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
                                <div className="form-group">
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
                                    <div className="existing-addresses">
                                        {addresses.map((address, index) => (
                                            <div key={index} className="address-option">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedAddress === address}
                                                    onChange={() => handleAddressSelect(address)}
                                                />
                                                <label className="address-label">{address}</label>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {addressType === "new" && (
                                    <div className="form-group">
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
                                            className="save-address-button"
                                            onClick={handleSaveNewAddress}
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

                        <button type="submit" className="send-preorder-button">Submit Preorder</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendPreorder;
