import React, { useState } from 'react';
import axios from 'axios';
import './st.css';
import NavbarLogin from "../../components/navbar-login/index.jsx";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Funcția de autentificare
    const handleLogIn = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                email: email,
                password: password
            });
            // Dacă autentificarea este reușită, salvează token-ul JWT și redirecționează
            if (response.status===200) {
                localStorage.setItem('token', response.data.data.token);
                navigate('/');
            } else {
                setErrorMessage("Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <>
            <NavbarLogin />
            <div className="sign-in-container">
                <div className="sign-in-box">
                    <h2 className="sign-in-header">Sign in</h2>
                    <form className="sign-in-form" onSubmit={handleLogIn}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="sign-in-button">Sign in</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
