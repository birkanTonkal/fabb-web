import React, { useState } from "react";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import { useDispatch } from "react-redux";

import { loginUser } from "../slices/authSlice";
import Logo from "../assets/logo";
import "../styles/Login.scss";
import { config } from "../utils/Constants";
import { useNavigate } from "react-router";

import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async () => {
    const userCredentials = await axios.get(
      `${config.URL}/user/signin?email=${email}&password=${password}`
    );
    console.log(userCredentials.data);
    if (userCredentials.status === 200) {
      const userData = Object.values(userCredentials.data)[0];
      dispatch(loginUser(userData));
      navigate("/dashboard", { replace: true });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <LoginLeftPanel />
      </div>

      <div className="login-right">

        <Logo className="logo" />
        <Divider>Sign in to dashboard</Divider>

        <Form>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input
              className="login-input"
              size="large"
              placeholder="Email"
              prefix={<UserOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input.Password
              className="login-input"
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item>
            <Button className="login-form-button" htmlType="submit">
              Login
            </Button>
            <a className="login-form-forgot" href="">
              Forgot password ?
            </a>
          </Form.Item>
        </Form>

        <Form.Item className="login-down">
          <span>Don’t have an account ?</span>
          <span>
            <a href="./register">Apply for a new account</a>
          </span>
        </Form.Item>
      </div>
    </div>
  );
}

export default Login;
