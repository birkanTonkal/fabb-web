import React from "react";
import "../styles/Login.scss";
import { useEffect } from "react";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import Logo from "../assets/logo";
import { HiUser } from "react-icons/hi";

function Login() {
  useEffect(() => {}, []);

  const login = async () => {
    const userCredentials = await axios.get(
      "http://localhost:5111/user/signin?email=deneme@gmail.com&password=deneme"
    );
    console.log(userCredentials.data);
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
              <input type="text" placeholder="Email" id="email-input"/>
            </div>
            <div className="input-area">
              <input placeholder="Password" id="password-input"/>
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
