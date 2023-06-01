import React from 'react'
import { useSelector } from "react-redux";
import "../styles/Profile.scss";

function Profile() {
    const authState = useSelector((state) => state.auth);
    const userData = authState.user;
    console.log(userData)
    
    return (
        <>
            <div className='form'>
            <div className="profile-area">
                <p className="label">Created Date</p>
                <input
                    value={userData.create_date}
                    disabled
                />
            </div>
            
            <div className="profile-area">
                <p className="label">Full Name</p>
                <input
                    value={userData.full_name}
                />
            </div>

            <div className="profile-area">
                <p className="label">Email</p>
                <input
                    value={userData.email}
                />
            </div>

            <div className="profile-area">
                <p className="label">Phone</p>
                <input
                    value={userData.phone_number}
                />
            </div>

            <div className="profile-area">
                <p className="label">User Type</p>
                <input
                    value={userData.user_type}
                />
            </div>
        </div>

        <div className="button-area">
            <button>Update</button>
        </div>
        </>
    )
}

export default Profile