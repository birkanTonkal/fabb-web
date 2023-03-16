import React from "react";
import "../styles/Register.scss";
import { useEffect } from "react";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import Logo from "../assets/logo";

import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Divider } from "antd";

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
            {/* <Logo className="logo" /> */}
            <div className="title">Apply to the system</div>
          </div>         

          <Form
            labelCol={{
              span: 8,
            }}
          >
            <Form.Item
              className="form-item"
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="register-input" placeholder="Type your name" />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="surname"
              label="Surname"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input
                className="register-input"
                placeholder="Type your surname"
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="register-input" placeholder="Type your email" />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input className="register-input" addonBefore={"+90"} placeholder="( _ _ _ ) _ _ _  _ _ _ _" />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input.Password
                className="register-input"
                placeholder="Type your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="confirm_password"
              label="Confirm password"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input.Password
                className="register-input"
                placeholder="Type your password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <div className="btn">
              <Button className="register-form-button" htmlType="submit">Apply</Button>
            </div>
          </Form>

          <p className="docs">
            By creating an account with FABB, you agree to the{" "}
            <a href="#">
              <b>Terms and Conditions</b>
            </a>{" "}
            and{" "}
            <a href="#">
              <b>Privacy Policy</b>
            </a>
          </p>

          <Form.Item className="register-down">
            <span>Already have an account ?</span>
            <span>
              <a href="./login">Login</a>
            </span>
          </Form.Item>
        </div>
      </div>
    </>
  );
}

export default Register;
