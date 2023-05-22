import React, { useRef, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginLeftPanel from "../components/LoginLeftPanel";
import { config } from "../utils/Constants";

import {
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal } from "antd";

function Register() {
  const firstNameField = useRef(null);
  const secondNameField = useRef(null);
  const emailField = useRef(null);
  const passwordField = useRef(null);
  const phoneField = useRef(null);
  const navigate = useNavigate();
  message.config({
    duration: 2,
  });
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

    if (userCredentials) {
      message.info("Your request has been received. We will get in touch with you shortly ")
    }
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    form.resetFields();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log("ok")
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    console.log("cancel")
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
            <a onClick={showModal}>
              <b>Terms and Conditions</b>
            </a>{" "}
            and{" "}
            <a onClick={showModal}>
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

        <Modal open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} 
          width={700}
          bodyStyle={{ overflowY: 'scroll', height: 'calc(100vh - 200px)', padding: 30 }}
        >
          <div>
            <h3>Terms and Conditions</h3>
            <p style={{margin: 0}}>
              Introduction <br />
              These Terms and Conditions govern your registration and use of the web panel ("Web Panel") provided by our organization. By completing the registration process and accessing the Web Panel, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these Terms and Conditions, you may not register or use the Web Panel.
              <br /><br />
              Registration<br />
              2.1 Eligibility: To register for the Web Panel, you must be at least 18 years old and have the authority to enter into a binding agreement on behalf of the organization you represent.
              2.2 Accurate Information: You agree to provide accurate, current, and complete information during the registration process. You are solely responsible for maintaining the confidentiality of your registration details.
              <br /><br />
              User Responsibilities<br />
              3.1 Authorized Use:
              You agree to use the Web Panel solely for lawful purposes and in compliance with all applicable laws and regulations.
              You will not engage in any activity that may disrupt or interfere with the proper functioning of the Web Panel or its associated services.
              You will not attempt to gain unauthorized access to the Web Panel or any related systems or networks.
              <br /><br />
              Intellectual Property<br />
              4.1 Ownership: The Web Panel and all related content, including but not limited to text, graphics, logos, images, and software, are the property of our organization or its licensors and are protected by intellectual property laws.
              4.2 License: By registering for the Web Panel, we grant you a limited, non-exclusive, non-transferable license to use the Web Panel for the purposes intended.
            </p>
            
            <h3>Privacy Policy</h3>
            <p style={{margin: 0}}>
              Information Collection and Use<br />
              1.1 Personal Information: During the registration process, we may collect personal information such as your name, email address, and contact details. This information will be used solely for the purpose of providing and maintaining the Web Panel and communicating with you regarding your account.
              1.2 Log Data: We may also collect log data, including your IP address, browser type, and operating system, to analyze trends, administer the Web Panel, and gather demographic information.
              <br /><br />
              Data Security<br />
              2.1 We take appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              2.2 We will not sell, trade, or rent your personal information to third parties unless we have your explicit consent or are required by law to do so.
              <br /><br />
              Cookies<br />
              3.1 The Web Panel may use cookies to enhance your user experience. These cookies may collect information about your usage patterns and preferences.
              <br /><br />
              Changes to the Privacy Policy<br />
              4.1 We reserve the right to modify or update this Privacy Policy at any time. Any changes will be effective immediately upon posting the revised Privacy Policy on the Web Panel.
              <br /><br />
              By registering for the Web Panel, you acknowledge that you have read and understood the Terms and Conditions and Privacy Policy, and you agree to abide by them.
            </p>          
          </div>

        </Modal>
      </div>
    </>
  );
}

export default Register;
