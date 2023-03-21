import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function ProtectedRoute({children }) {
	const isLoggedIn = localStorage.getItem('isLoggedIn')
	if (!isLoggedIn) {
		return <Navigate to="/login" replace />;
	}
	return children
}

export default ProtectedRoute