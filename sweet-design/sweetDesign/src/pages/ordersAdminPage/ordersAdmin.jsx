import React, {useEffect, useState} from 'react';
import Navbar from "../../components/navbar/index.jsx";
import OrderCard from "../../components/orderCard/order.jsx";
import cakeImage from '../../images/cake-image.jpeg';
import cupcakeImage from '../../images/cake-image.jpeg';
import cookieImage from '../../images/cookie-image.jpeg';
import sweetsImage from '../../images/sweets-image.jpeg';
import './styleOrdersAdmin.css';
import axios from "axios";

const initialOrders = [
    {
        id: 'P1',
        date: '2024-12-10',
        deadline: '2024-12-15',
        deliveryMethod: 'Courier',
        status: 'placed',
        totalPrice: 200.00,
        phoneNumber: '123-456-7890',
        address: '123 Main Street, Timisoara',
        products: [
            {
                id: 'prod-cookie1',
                name: 'Chocolate cookie',
                price: 5,
                category: 'cookies',
                quantity: 5,
                image: cookieImage,
                ingredients: 'Flour, Sugar, Chocolate',
                mentions: 'No nuts'
            }
        ]
    },
    {
        id: 'P2',
        date: '2024-12-11',
        deadline: '2024-12-18',
        deliveryMethod: 'Pickup',
        status: 'placed',
        totalPrice: 150.00,
        phoneNumber: '111-222-3333',
        address: '45 Short Road, Cluj',
        products: [
            {
                id: 'prod-cake1',
                name: 'Strawberry Cake',
                price: 50,
                category: 'cakes',
                quantity: 3,
                image: cakeImage,
                ingredients: 'Flour, Eggs, Strawberries, Cream',
                mentions: ''
            }
        ]
    },
    {
        id: 'P3',
        date: '2024-12-12',
        deadline: '2024-12-19',
        deliveryMethod: 'Courier',
        status: 'placed',
        totalPrice: 80.00,
        phoneNumber: '222-333-4444',
        address: '10 Cookie Ave, Oradea',
        products: [
            {
                id: 'prod-cookie2',
                name: 'Vanilla Cookies',
                price: 4,
                category: 'cookies',
                quantity: 10,
                image: cookieImage,
                ingredients: 'Flour, Sugar, Vanilla',
                mentions: 'Gluten-free'
            }
        ]
    },
    {
        id: 'P4',
        date: '2024-12-13',
        deadline: '2024-12-20',
        deliveryMethod: 'Pickup',
        status: 'placed',
        totalPrice: 300.00,
        phoneNumber: '333-444-5555',
        address: '89 Dessert Street, Brasov',
        products: [
            {
                id: 'prod-cupcake1',
                name: 'Chocolate Cupcakes',
                price: 10,
                category: 'cupcakes',
                quantity: 10,
                image: cupcakeImage,
                ingredients: 'Flour, Eggs, Chocolate, Buttercream',
                mentions: 'Extra chocolate topping'
            }
        ]
    },
    {
        id: 'P5',
        date: '2024-12-14',
        deadline: '2024-12-22',
        deliveryMethod: 'Courier',
        status: 'placed',
        totalPrice: 60.00,
        phoneNumber: '444-555-6666',
        address: '77 Sweet Lane, Timisoara',
        products: [
            {
                id: 'prod-sweets1',
                name: 'Assorted Lollipops',
                price: 2,
                category: 'sweets',
                quantity: 30,
                image: sweetsImage,
                ingredients: 'Sugar, Fruit flavors',
                mentions: ''
            }
        ]
    },

    {
        id: 'F1',
        date: '2024-12-15',
        deadline: '2024-12-22',
        deliveryMethod: 'Pickup',
        status: 'finished',
        totalPrice: 120.00,
        phoneNumber: '098-765-4321',
        address: '456 Another Road, Bucharest',
        products: [
            {
                id: 'prod-cake2',
                name: 'Strawberry Cake',
                price: 50,
                category: 'cakes',
                quantity: 2,
                image: cakeImage,
                ingredients: 'Flour, Eggs, Strawberries, Cream',
                mentions: 'Birthday decoration'
            }
        ]
    },
    {
        id: 'F2',
        date: '2024-12-16',
        deadline: '2024-12-24',
        deliveryMethod: 'Courier',
        status: 'finished',
        totalPrice: 90.00,
        phoneNumber: '555-666-7777',
        address: '999 Candy Boulevard, Iasi',
        products: [
            {
                id: 'prod-cookie3',
                name: 'Hazelnut Cookies',
                price: 3,
                category: 'cookies',
                quantity: 20,
                image: cookieImage,
                ingredients: 'Flour, Sugar, Hazelnut',
                mentions: ''
            }
        ]
    }
];

const OrdersAdmin = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [currentSection, setCurrentSection] = useState('ARRIVED');
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

    const filteredOrders = ordersData
        .filter(o => o.orderStatus === currentSection)
        .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

    const handlePrev = () => {
        if (filteredOrders.length === 0) return;
        if (currentOrderIndex === 0) {
            setCurrentOrderIndex(filteredOrders.length - 1);
        } else {
            setCurrentOrderIndex(currentOrderIndex - 1);
        }
    };

    const getAllOrders = async () =>{
        try {
            const response = await axios.get(`http://localhost:8080/api/in/user/order/get_all_orders`);
            console.log("Produse obținute de la API:", response.data.data);
            setOrdersData(response.data.data); // Stocăm toate produsele
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleNext = () => {
        if (filteredOrders.length === 0) return;
        if (currentOrderIndex === filteredOrders.length - 1) {
            setCurrentOrderIndex(0);
        } else {
            setCurrentOrderIndex(currentOrderIndex + 1);
        }
    };

    const currentOrder = filteredOrders[currentOrderIndex];

    const changeOrderStatus = async (newStatus) => {

        if (!currentOrder) return;
        const movedOrderId = currentOrder.orderId;
        console.log(currentOrder)
        try{
            console.log(newStatus)
            const response = await axios.post(`http://localhost:8080/api/in/user/order/change_order_status/${movedOrderId}/${newStatus}`,
                {
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
            if(response.status===200){
                console.log(response)
                setCurrentSection(newStatus);
                getAllOrders()
                const newFilteredOrders = ordersData
                    .filter(o => o.status === newStatus)
                    .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

                const newIndex = newFilteredOrders.findIndex(o => o.id === movedOrderId);

                setCurrentOrderIndex(newIndex !== -1 ? newIndex : 0);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }


    };

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <>
            <Navbar />
            <div className="orders-admin-page">
                <h1 className="orders-page-title">Orders Management</h1>
                <div className="orders-section-buttons">
                    <button
                        className={`section-button ${currentSection === 'ARRIVED' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('ARRIVED'); setCurrentOrderIndex(0); }}
                    >
                        Placed Orders
                    </button>
                    <button
                        className={`section-button ${currentSection === 'READY' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('READY'); setCurrentOrderIndex(0); }}
                    >
                        Finished Orders
                    </button>
                    <button
                        className={`section-button ${currentSection === 'SHIPPED' ? 'active' : ''}`}
                        onClick={() => { setCurrentSection('SHIPPED'); setCurrentOrderIndex(0); }}
                    >
                        Order History
                    </button>
                </div>

                <div className="orders-admin-wrapper">
                    <div className="orders-admin-button-container">
                        <button className="orders-admin-nav-button" onClick={handlePrev} disabled={filteredOrders.length === 0}>
                            ← Prev
                        </button>
                    </div>

                    <div className="orders-admin-card-container">
                        {filteredOrders.length > 0 ? (
                            <div className="order-card-actions">
                                <OrderCard order={currentOrder} />
                                {currentSection === 'ARRIVED' && (
                                    <button
                                        className="orders-admin-status-button"
                                        onClick={() => changeOrderStatus('READY')}
                                    >
                                        Move to Finished
                                    </button>
                                )}
                                {currentSection === 'READY' && (
                                    <button
                                        className="orders-admin-status-button"
                                        onClick={() => changeOrderStatus('SHIPPED')}
                                    >
                                        Move to History
                                    </button>
                                )}
                            </div>
                        ) : (
                            <p className="no-orders-message">No orders in this section.</p>
                        )}
                    </div>

                    <div className="orders-admin-button-container">
                        <button className="orders-admin-nav-button" onClick={handleNext} disabled={filteredOrders.length === 0}>
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrdersAdmin;
