/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem('token');

    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
