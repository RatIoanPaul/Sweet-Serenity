import React from 'react';
import './styleProfile.css';
import Navbar from "../../components/navbar/index.jsx";
import profileImage from "../../images/user.png"; // Make sure this path is correct

const Profile = () => {
    return (
        <>
            <Navbar />
            <div className="profile-container">
                <img src={profileImage} alt="Profile" className="profile-image" />
                <button className="profile-button">Sign out</button>
            </div>
        </>
    );
};

export default Profile;
