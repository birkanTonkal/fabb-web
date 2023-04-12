import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Layout, Menu } from "antd";
import { useDispatch } from "react-redux";
import "../styles/Dashboard.scss";
import Logo from "../assets/logo-sm";
import { changePage } from "../slices/dashboardSlice";
import {
  IssuesCloseOutlined,
  BarChartOutlined,
  PhoneOutlined,
  LogoutOutlined,
  UsergroupAddOutlined
} from "@ant-design/icons";
import LoginLeftPanel from "../components/LoginLeftPanel";
import Users from "./Users";
import Incidents from "./Incidents";
import Statistics from "./Statistics";
import ContactUs from "./ContactUs";
import axios from "axios";
import { config } from "../utils/Constants";
import { loginUser } from "../slices/authSlice";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, bool) {
  if(bool) {
    return 0;
  }
  else {
    return { label, key, icon };
  }  
}

function Dashboard() {
  const authState = useSelector((state) => state.auth);
  const dashboardState = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  const [currentOpenPage, setCurrentOpenPage] = useState("Incidents");
  const show = JSON.stringify(authState.user);
  const isDisabled = authState.user == 'admin' ? false : true;

  const items = [
    getItem("Users", "Users", <UsergroupAddOutlined />, !isDisabled),
    getItem("Incidents", "Incidents", <IssuesCloseOutlined />, 0),
    getItem("Statistics", "Statistics", <BarChartOutlined />, 0),
    getItem("Contact Us", "Contact Us", <PhoneOutlined />, 0),
    getItem("Logout", "Logout", <LogoutOutlined />, 0),
  ];

  useEffect( ()=>{
    if(authState.user_type == null) {
        let userId = localStorage.getItem('user_id');
        getUserByUserId(userId)
    }
  }, [])
  const getUserByUserId = async (userId) => {
     let user = await axios.get( `${config.URL}/user/${userId}`);
     if (user.data) {
      dispatch(loginUser(user.data))
     }
     
  }
  const changePageOnRedux = (e) => {
    setCurrentOpenPage(e.key)
    dispatch(changePage(e.key))
  };

  const [collapsed, setCollapsed] = useState(true);
  
  const RenderPage = () => {
    switch(dashboardState.currentPage) {
      case 'Users':
        return <Users />
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
        // collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
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

      <Layout className="layout-right-area" >
        <Header className="header">{dashboardState.currentPage}</Header>

        <Content className="content">
         <RenderPage />
        </Content>

        {/* <Footer className="footer">Made by FabbSoft ©2023</Footer> */}
      </Layout>
    </Layout>
  );
}
export default Dashboard;