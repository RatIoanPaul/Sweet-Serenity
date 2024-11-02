import React, { useState } from 'react';
import './stylePo.css';
import Navbar from "../../components/navbar/index.jsx";
import { useNavigate } from 'react-router-dom';

const SendPreorder = () => {
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [preorderDate, setPreorderDate] = useState("");
    const [addressType, setAddressType] = useState("existing");
    const [existingAddress, setExistingAddress] = useState("123 Main St, City, Country");
    const [newAddress, setNewAddress] = useState("");

    const handleDeliveryMethodChange = (event) => {
        const method = event.target.value;
        setDeliveryMethod(method);
        setDeliveryCost(method === "delivery" ? 10 : 0);
    };
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Preorder submitted!");
        navigate("/");
    };

    return (
        <>
            <Navbar />
            <div className="send-preorder-container">
                <div className="send-preorder-box">
                    <h2 className="send-preorder-header">Preorder Details</h2>
                    <form className="send-preorder-form" onSubmit={handleSubmit}>
                        <div>
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

                        <div>
                            <label htmlFor="preorderDate">Preorder Date:</label>
                            <input
                                type="date"
                                id="preorderDate"
                                value={preorderDate}
                                onChange={(e) => setPreorderDate(e.target.value)}
                            />
                        </div>

                        <div>
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
                            <p className="address-display">Address: {existingAddress}</p>
                        )}

                        {addressType === "new" && (
                            <div>
                                <label htmlFor="newAddress">New Address:</label>
                                <input
                                    type="text"
                                    id="newAddress"
                                    placeholder="Enter your new address"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                            </div>
                        )}

                        <button type="submit" className="send-preorder-button">Submit Preorder</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendPreorder;
