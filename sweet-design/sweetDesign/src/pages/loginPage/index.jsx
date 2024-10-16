import React from 'react';
import './st.css';
import NavbarLogin from "../../components/navbar-login/index.jsx";

const SignIn = () => {
    return (
        <>
            <NavbarLogin />
            <div className="sign-in-container">
                <div className="sign-in-box">
                    <h2 className="sign-in-header">Sign in</h2>
                    <form className="sign-in-form">
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" placeholder="Email" />
                        </div>

                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" placeholder="Password" />
                        </div>

                        <button type="submit" className="sign-in-button">Sign in</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignIn;
