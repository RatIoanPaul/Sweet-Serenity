import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styless.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        birthdate: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (formData.password !== formData.repeatPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                dob: formData.birthdate
            });
            console.log('Response data:', response.data);

            if (response.status===200) {
                navigate('/verify-otp', { state: { email: formData.email, name: formData.name, password: formData.password, dob: formData.birthdate } });
            }

        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);

            } else {
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <div className="register-container">
                <div className="register-box">
                    <h2 className="register-header">Register</h2>
                    <form className="register-form" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="repeatPassword">Repeat Password:</label>
                            <input type="password" id="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} required />
                        </div>

                        <div>
                            <label htmlFor="birthdate">Birth Date:</label>
                            <input type="date" id="birthdate" placeholder="Birth Date" value={formData.birthdate} onChange={handleChange} required />
                        </div>

                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <button type="submit" className="register-button">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
