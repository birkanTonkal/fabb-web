import React from "react";
import "../styles/Login.scss";
import { useEffect } from "react";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import Logo from "../assets/logo";

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
          <div className="up">
            <Logo className="logo" />
            <div className="title">Sign in to dashboard</div>
          </div>

          <div className="middle">
            <div className="input-area">
              <label className="label">Email</label>
              <input placeholder="Type your email"/>
            </div>
            <div className="input-area">
              <label className="label">Password</label>
              <input placeholder="Type your password" />
            </div>

            <button onClick={login}>Login</button>
            <p className="forgotPassword">Forgot password ?</p>
          </div>

          <div className="down">
            <span>Don’t have an account ?</span>
            <span>
              <a href="#">Apply for a new account</a>
            </span>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default Login;
