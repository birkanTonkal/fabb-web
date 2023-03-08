import React, { useState } from "react";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";

import { useDispatch } from 'react-redux'
import { loginUser } from "../slices/authSlice";
import Logo from "../assets/logo";
import "../styles/Login.scss";
import { config } from "../utils/Constants";
import { useNavigate } from "react-router";


function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const login = async () => {
    const userCredentials = await axios.get(
      `${config.URL}/user/signin?email=${email}&password=${password}`
    );
    console.log(userCredentials.data);
    if (userCredentials.status === 200) {
      const userData = Object.values(userCredentials.data)[0]
      dispatch(loginUser(userData))
      navigate('/dashboard', { replace: true });
    }
  };


  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <LoginLeftPanel />
        </div>

        <div className="login-right">
          <div className="login-up">
            <Logo className="logo" />
            <div className="title">Sign in to dashboard</div>
          </div>

          <div className="login-middle">
            <div className="input-area">
              <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} id="email-input"/>
            </div>
            <div className="input-area">
              <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} id="password-input"/>
            </div>

            <button onClick={login} className="login-btn">Login</button>
            <p className="forgotPassword">Forgot password ?</p>
          </div>

          <div className="login-down">
            <span>Don’t have an account ?</span>
            <span>
              <a href="./register">Apply for a new account</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
