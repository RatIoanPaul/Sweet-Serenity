import React from 'react';
import './styleProfile.css';
import Navbar from "../../components/navbar/index.jsx";
import profileImage from "../../images/user.png";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        // Șterge tokenul de autentificare
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <button className="profile-button" onClick={handleSignOut}>
                    Sign out
                </button>
            </div>
        </>
    );
};

export default Profile;
