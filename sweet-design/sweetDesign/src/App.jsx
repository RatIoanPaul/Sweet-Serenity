import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/homePage';
{/*import HomeAdmin from './pages/adminPage/index.jsx';*/}

import SignIn from "./pages/loginPage/index.jsx";
import Register from "./pages/registerPage/index.jsx";

const App = () => {
    return (
        <Router >
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/signin" element={<SignIn/>} />
                <Route path="/register" element={<Register/>} />
            </Routes>
        </Router>
    );
};

export default App
