import React from 'react';
import PropTypes from 'prop-types';  // Importă PropTypes
import ProtectedRoute from './ProtectedRoute';

const PatientRoute = ({ children }) => {
    return (
        <ProtectedRoute role="CUSTOMER">
            {children}
        </ProtectedRoute>
    );
};

PatientRoute.propTypes = {
    children: PropTypes.node.isRequired // Definim tipul pentru prop-ul children
};

export default PatientRoute;