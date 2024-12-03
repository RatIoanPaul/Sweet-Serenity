import React, { useState, useEffect } from 'react';
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
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // ======= Simulare Fetch Adrese (useEffect) =======
    useEffect(() => {
        // Exemplu de fetch al adreselor utilizatorului:
        // Înlocuiește cu API-ul real de fetch pentru adrese:
        /*
        const fetchAddresses = async () => {
            try {
                const response = await axios.get(`API_URL`, { headers: { Authorization: `Bearer TOKEN` } });
                setAddresses(response.data); // Actualizează adresele pe baza răspunsului.
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };
        fetchAddresses();
        */
        // Simulare locală:
        setAddresses([
            { id: 1, address: "Timisoara" },
            { id: 2, address: "Arad" },
            { id: 3, address: "Honolulu" },
        ]);
    }, []);

    const handleDeliveryMethodChange = (event) => {
        const method = event.target.value;
        setDeliveryMethod(method);
        setDeliveryCost(method === "delivery" ? 10 : 0);
    };

    const handleAddressSelect = (addressId) => {
        setSelectedAddress(addressId);
    };

    // ======= Simulare Adăugare Adresă Nouă =======
    const handleSaveNewAddress = () => {
        if (newAddress && !addresses.find(addr => addr.address === newAddress)) {
            // Simulare locală - Înlocuiește cu API de POST pentru adresă:
            /*
            const saveAddress = async () => {
                try {
                    const response = await axios.post(`API_URL`, { address: newAddress, phoneNumber }, { headers: { Authorization: `Bearer TOKEN` } });
                    setAddresses([...addresses, response.data]); // Adaugă adresa nouă din răspuns.
                    setNewAddress("");
                    setAddressType("existing");
                } catch (error) {
                    console.error("Error saving address:", error);
                }
            };
            saveAddress();
            */
            // Simulare locală:
            const newId = addresses.length + 1;
            setAddresses([...addresses, { id: newId, address: newAddress }]);
            setNewAddress("");
            setAddressType("existing");
        }
    };

    // ======= Simulare Submisie Precomandă =======
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Datele comenzii:
        const preorderData = {
            deliveryMethod,
            deliveryCost,
            preorderDate,
            address: addressType === "new" ? newAddress : selectedAddress,
            phoneNumber,
        };

        // Exemplu de apel API pentru submisie:
        /*
        try {
            const response = await axios.post(`API_URL`, preorderData, { headers: { Authorization: `Bearer TOKEN` } });
            if (response.status === 200) {
                alert("Preorder successfully submitted!");
                navigate("/");
            }
        } catch (error) {
            console.error("Error submitting preorder:", error);
        } finally {
            setLoading(false);
        }
        */

        // Simulare locală:
        alert(`Preorder submitted with data: ${JSON.stringify(preorderData)}`);
        setLoading(false);
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
                    {loading && <p>Loading...</p>}
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
                                        {addresses.map((addressItem) => (
                                            <div key={addressItem.id} className="address-option">
                                                <input
                                                    type="radio"
                                                    name="address"
                                                    value={addressItem.id}
                                                    checked={selectedAddress === addressItem.id}
                                                    onChange={() => handleAddressSelect(addressItem.id)}
                                                />
                                                <label className="address-label">{addressItem.address}</label>
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

                        <button type="submit" className="send-preorder-button" disabled={loading}>
                            Submit Preorder
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SendPreorder;
