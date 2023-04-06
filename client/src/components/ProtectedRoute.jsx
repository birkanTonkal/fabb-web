import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

function ProtectedRoute({children }) {
	const isLoggedIn = localStorage.getItem('isLoggedIn')
	console.log(isLoggedIn)
	if (isLoggedIn == 'false') {
		console.log("sa")
		return <Navigate to="/login" replace />;
	}
	return children
}

export default ProtectedRoute