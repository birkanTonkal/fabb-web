import React from 'react'
import { useSelector } from "react-redux";

function Profile() {
    const authState = useSelector((state) => state.auth);
    const userData = authState.user
    console.log(userData)
    return (
        <div></div>
    )
}

export default Profile