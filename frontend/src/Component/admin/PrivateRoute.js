import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/" />; // Chuyển hướng user về trang home nếu không phải admin
  }

  return children;
};

export default PrivateRoute;
