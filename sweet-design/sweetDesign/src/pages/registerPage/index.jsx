import React from 'react';
import './styless.css';
import NavbarLogin from "../../components/navbar-login/index.jsx";

const Register = () => {
    return (
        <>
            <NavbarLogin />
            <div className="register-container">
                <div className="register-box">
                    <h2 className="register-header">Register</h2>
                    <form className="register-form">
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" placeholder="Name" />
                        </div>

                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="Email" />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" placeholder="Password" />
                        </div>

                        <div>
                            <label htmlFor="repeatPassword">Repeat Password:</label>
                            <input type="password" id="repeatPassword" placeholder="Repeat Password" />
                        </div>

                        <div>
                            <label htmlFor="birthdate">Birth Date:</label>
                            <input type="date" id="birthdate" placeholder="Birth Date" />
                        </div>

                        <button type="submit" className="register-button">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
