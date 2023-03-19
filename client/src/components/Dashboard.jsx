import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Layout, Menu } from "antd";

import "../styles/Dashboard.scss";
import Logo from "../assets/logo-sm";
import Incidents from "../pages/Incidents";

import {
  IssuesCloseOutlined,
  BarChartOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return { label, key, icon };
}
const items = [
  getItem("Incidents", "1", <IssuesCloseOutlined />),
  getItem("Statistics", "2", <BarChartOutlined />),
  getItem("Contact Us", "3", <PhoneOutlined />),
  getItem("Logout", "4", <LogoutOutlined />),
];

function Dashboard() {
  const store = useSelector((state) => state.auth);
  const show = JSON.stringify(store.user);

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="container">
      <Sider
        className="layout-left-area"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo-area">
          <Logo className="logo" />
        </div>

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>

      <Layout className="layout-right-area">
        <Header className="header"> </Header>

        <Content className="content">
          <Incidents />
        </Content>

        <Footer className="footer">Made by FabbSoft ©2023</Footer>
      </Layout>
    </Layout>
  );
}
export default Dashboard;
