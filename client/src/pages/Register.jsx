import React from "react";
import "../styles/Register.scss";
import { useEffect } from "react";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import Logo from "../assets/logo";

function Register() {
  useEffect(() => {}, []);

  const register = async () => {
    const userCredentials = await axios.get(
      "http://localhost:5111/user/signin?email=deneme@gmail.com&password=deneme"
    );
    console.log(userCredentials.data);
  };
  return (
    <>
      <div className="register-container">
        <div className="register-left">
          <LoginLeftPanel />
        </div>

        <div className="register-right">
          <div className="register-up">
            <Logo className="logo" />
            <div className="title">Apply to the system</div>
          </div>

          <div className="register-middle">
            <div className="form-left">
              <div className="input-area">
                <label className="label">Name</label>
                <input placeholder="Type your name" />
              </div>
              <div className="input-area">
                <label className="label">Surname</label>
                <input placeholder="Type your surname" />
              </div>
              <div className="input-area">
                <label className="label">Phone</label>
                <input placeholder="Type your phone" />
              </div>
            </div>

            <div className="form-right">
              <div className="input-area">
                <label className="label">Email</label>
                <input placeholder="Type your email" />
              </div>
              <div className="input-area">
                <label className="label">Password</label>
                <input placeholder="Type your password" />
              </div>
              <div className="input-area">
                <label className="label">Confirm password</label>
                <input placeholder="Type your password" />
              </div>
            </div>
          </div>

          <div className="apply-btn">
            <button onClick={register}>Apply</button>
            <p>
              By creating an account with FABB, you agree to the <a href="#"><b>Terms and
              Conditions</b></a> and <a href="#"><b>Privacy Policy</b></a>
            </p>
          </div>

          <div className="register-down">
            <span>Already have an account ?</span>
            <span>
              <a href="./login">Login</a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
