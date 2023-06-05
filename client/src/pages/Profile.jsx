import React from 'react'
import { useSelector } from "react-redux";
import "../styles/Profile.scss";
import { Card, Col, Row } from 'antd';
import Logo from "../assets/logo_mavi.png";

function Profile() {
    const authState = useSelector((state) => state.auth);
    const userData = authState.user;
    console.log(userData)

    const updateUser = async () => {

    };

    let date = new Date(userData.create_date);

    const current = new Date();   
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[current.getDay()];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[current.getMonth()];
    const currentDate = `${current.getDate()} ${month} ${current.getFullYear()} ${day}`;

    var hours = current.getHours();
    var minutes = current.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var currentTime = hours + ":" + minutes;
    
    return (
        <>
        <Row gutter={[30, 30]}>
            <Col span={12} className='col'>
                <Card className='form-card'>                        
                    <div className='created-date'>
                        <label>Created Date :</label>
                        <input value={`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} disabled/>
                    </div>
                          
                    <div>
                        <div className='profile-label'>
                            <label>Full Name</label>
                            <input placeholder={userData.full_name}/>
                        </div>

                        <div className='profile-label'>
                            <label>Email</label>
                            <input placeholder={userData.email}/>
                        </div>

                        <div className='profile-label'>
                            <label>Phone</label>
                            <input placeholder={userData.phone_number}/>
                        </div>

                        <div className='profile-label'>
                            <label>Date of Birth</label>
                            <input type='date' placeholder={userData.date_of_birth}/>
                        </div>

                        <div className='profile-label'>
                            <label>User Type</label>
                            <input value={userData.user_type} disabled/>
                        </div>
                    </div>

                    <div className="button-area">
                        <button className="update-button" type='submit' 
                        onClick={() => {
                            updateUser();
                        }}> Update </button>
                    </div>
                </Card>
            </Col>

            <Col span={12}>
                <Row>
                    <Card className='card time-area'>
                        <div className='left'>
                            <p className='time'>{currentTime}</p>
                            <p className='date'>{currentDate}</p>
                        </div>
                        
                        <div className='right'>
                            <img src={Logo} width={300}/>  
                        </div>                    
                    </Card>
                </Row>

                <Row className='bottom-row'>
                    <Card className='card map-card'>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12236.432417743603!2d32.8381964!3d39.9389715!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34e563846dcab%3A0xa1cab2c838993817!2sT.C.%20Ankara%20B%C3%BCy%C3%BCk%C5%9Fehir%20Belediyesi!5e0!3m2!1str!2str!4v1685999701517!5m2!1str!2str" width={800} height={420}></iframe>
                        <p><span>Ankara Metropolitan Municipality</span> <br /> Emniyet, Hipodrom Cd. No:5, 06430 Yenimahalle/Ankara</p>
                    </Card>
                </Row>
            </Col>
        </Row>
        </>
    )
}

export default Profile