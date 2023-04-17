import React, { useRef } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import { config } from "../utils/Constants";

import {
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";

function Register() {
  const firstNameField = useRef(null);
  const secondNameField = useRef(null);
  const emailField = useRef(null);
  const passwordField = useRef(null);
  const phoneField = useRef(null);
  const navigate = useNavigate();

  const register = async () => {
    const userCredentials = await axios.post(`${config.URL}/user/signup`, {
      email: emailField.current.input.value,
      password: passwordField.current.input.value,
      phone_number: "+90" + phoneField.current.input.value,
      full_name:
        firstNameField.current.input.value +
        "" +
        secondNameField.current.input.value,
    });
    /*  if(userCredentials?.data?.user_id) {
      navigate('/login')
    } */
    console.log(userCredentials.data);
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.resetFields();
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
            onFinish={onFinish}
            form={form}
            labelCol={{
              span: 8,
            }}
          >
            <Form.Item
              className="form-item"
              name="name"
              label="Name"
              rules={[
                { required: true, message: "" },
                // { min: 3, message: "" },
              ]}
              hasFeedback
            >
              <Input
                className="register-input"
                placeholder="Type your name"
                ref={firstNameField}
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="surname"
              label="Surname"
              rules={[
                { required: true, message: "" },
                // { min: 3, message: "" },
              ]}
              hasFeedback
            >
              <Input
                className="register-input"
                placeholder="Type your surname"
                ref={secondNameField}
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="email"
              label="Email"
              rules={[
                { required: true, message: "" },
                { type: 'email', message: "" }
              ]}
              hasFeedback
            >
              <Input
                className="register-input"
                placeholder="Type your email"
                ref={emailField}
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "" },
                { min: 10, message: "" },
                { max: 10, message: "" }
              ]}
              hasFeedback
            >
              <Input
                className="register-input"
                addonBefore={"+90"}
                ref={phoneField}
                placeholder="( _ _ _ ) _ _ _  _ _ _ _"
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="password"
              label="Password"
              rules={[
                { required: true, message: "" },
                { min: 6, message: "" },
              // {
              //   validator: (_, value) =>
              //     value && value.includes("A")
              //       ? Promise.resolve()
              //       : Promise.reject("Password does not match criteria."),
              // },
              ]}
              hasFeedback
            >
              <Input.Password
                className="register-input"
                placeholder="Type your password"
                ref={passwordField}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              name="confirm_password"
              label="Confirm password"
              dependencies={["password"]}
              rules={[
                { required: true, message: ""},
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      ""
                    );
                  },
                }),
              ]}
              hasFeedback
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
              <Button
                className="register-form-button"
                htmlType="submit"
                onClick={() => {
                  register();
                }}
              >
                Apply
              </Button>
            </div>
          </Form>

          <Form.Item className="docs">
            By creating an account with FABB, you agree to the{" "}
            <a href="#">
              <b>Terms and Conditions</b>
            </a>{" "}
            and{" "}
            <a href="#">
              <b>Privacy Policy</b>
            </a>
          </Form.Item>

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
