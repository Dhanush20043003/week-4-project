import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role: requiredRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token || userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
