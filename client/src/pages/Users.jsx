import { Table, Badge, Tag } from "antd";
import axios from "axios";
import "../styles/Incidents.scss";
import UserRightPanel from "../components/UserRightPanel";
import {
  
} from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { config } from "../utils/Constants";

function Users() {

  const columns = [
    {
      title: "Full Name",
      dataIndex: "full_name",
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),      
    },
    {
      title: "Phone",
      dataIndex: "phone_number",      
    },
    {
      title: "Created Date",
      dataIndex: "create_date",
      // sorter: (a, b) => 
      //   new Date(...a.create_date.split("-").reverse()) -
      //   new Date(...b.create_date.split("-").reverse()),      
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      filters: [
        {
          text: "admin",
          value: "admin",
        },
        {
          text: "normal",
          value: "normal",
        },
      ],
      editable: true,
      onFilter: (value, record) => { return record.user_type[0] == value },    
    },
];
  const [userData, setUserData] = useState([])
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [userDetailData, setUserDetailData] = useState({})

  const fetchUserData = async () => {
    const res = await axios.get(
      `${config.URL}/user`
    );
    let users = res.data
    let fixedList = [];
    //console.log(res.data)
    let key = 0
    for(const userId in users) {
      users[userId].user_type =[users[userId].user_type]
      users[userId].key = key
      fixedList.push(users[userId])
      key += 1
    }
    setUserData(fixedList)
     
  }
  useEffect( () => {
    fetchUserData();
  }, [])
  
  const showDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  return (
    <>
    <Table
      className="incident-table"
      columns={columns}
      dataSource={userData}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {showDrawer(); setUserDetailData(record)}, // click row
        };
      }}
      onClick={((e) => {console.log(e)})}
      /* scroll={{
        y: 440,
      }} */
      pagination={{
        pageSize: 15,
      }}
    />
    <UserRightPanel toggleDrawer={toggleDrawer} showDrawer={showDrawer} userData={userDetailData}/>
    </>
  );
}
export default Users;
