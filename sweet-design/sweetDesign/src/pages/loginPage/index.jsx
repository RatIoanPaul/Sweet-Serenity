import React, { useState } from 'react';
import axios from 'axios';
import './st.css';
import { useNavigate } from 'react-router-dom';
import {parseJwt} from "../../utils/authService.jsx";

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
            console.log(response)
            // Dacă autentificarea este reușită, salvează token-ul JWT și redirecționează
            if (response.status === 200) {
                localStorage.setItem('token', response.data.data.token);
                const decodedToken = parseJwt(response.data.data.token);
                const role = decodedToken.role;

                if (role === "ADMIN") {
                    navigate('/admin');
                }
                else {
                    navigate('/');
                }
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage(error.message);
        }
    };

    return (
        <>
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

                        <div className="link-container">
                            <p className="create" onClick={() => navigate('/register')}>
                            I don't have an account.
                        </p>
                            <p className="forgot-password-link" onClick={() => navigate('/forgot-password')}>
                                I forgot my password.
                            </p>

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
