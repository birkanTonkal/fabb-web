import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import "../styles/Dashboard.scss";
import Logo from "../assets/logo-sm";
import Incidents from "./Incidents";
import { changePage } from "../slices/dashboardSlice";
import {
  IssuesCloseOutlined,
  BarChartOutlined,
  PhoneOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import LoginLeftPanel from "../components/LoginLeftPanel";
import Statistics from "./Statistics";
import ContactUs from "./ContactUs";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon) {
  return { label, key, icon };
}
const items = [
  getItem("Incidents", "Incidents", <IssuesCloseOutlined />),
  getItem("Statistics", "Statistics", <BarChartOutlined />),
  getItem("Contact Us", "Contact Us", <PhoneOutlined />),
  getItem("Logout", "Logout", <LogoutOutlined />),
];

function Dashboard() {
  const authState = useSelector((state) => state.auth);
  const dashboardState = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [currentOpenPage, setCurrentOpenPage] = useState("Incidents");
  const show = JSON.stringify(authState.user);

  const changePageOnRedux = (e) => {
    setCurrentOpenPage(e.key)
    dispatch(changePage(e.key))
  };

  const [collapsed, setCollapsed] = useState(true);
  
  const RenderPage = () => {
    switch(dashboardState.currentPage) {
      case 'Incidents':
        return <Incidents />
      case 'Statistics':
        return <Statistics />
      case 'Contact Us':
        return <ContactUs />
      default:
      return <Incidents />
    }
   
  }
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
          onClick={changePageOnRedux}
        />
      </Sider>

      <Layout className="layout-right-area">
        <Header className="header"> </Header>

        <Content className="content">
         <RenderPage />
        </Content>

        <Footer className="footer">Made by FabbSoft ©2023</Footer>
      </Layout>
    </Layout>
  );
}
export default Dashboard;
