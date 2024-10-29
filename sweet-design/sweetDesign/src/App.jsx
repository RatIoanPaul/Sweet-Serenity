import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/homePage';
{/*import HomeAdmin from './pages/adminPage/index.jsx';*/}

import SignIn from "./pages/loginPage/index.jsx";
import Register from "./pages/registerPage/index.jsx";
import Shop from "./pages/shopPage/index.jsx";
import Services from "./pages/servicesPage/index.jsx";
import Tasting from "./pages/tastingsPage/index.jsx";
import Events from "./pages/eventsPage/index.jsx";
import CheckoutPage from "./pages/checkoutPage/index.jsx";

const App = () => {
    return (
        <Router >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/services" element={<Services />} />
                <Route path="/tastings" element={<Tasting />} />
                <Route path="/events" element={<Events />} />
                <Route path="/cart" element={<CheckoutPage />} />

            </Routes>
        </Router>
    );
};

export default App
