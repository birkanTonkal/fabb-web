import { Drawer, Cascader, Input, Button, Modal } from "antd";
import { useRef, useState } from "react";
import "../styles/RightPanel.scss";
import "../styles/Incidents.scss";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../utils/Constants";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
dayjs.extend(customParseFormat);

const { TextArea } = Input;

const UserRightPanel = (props) => {
  const authState = useSelector((state) => state.auth);
  const userType = authState.user_type;
  const inputRef = useRef({});
  const { showDrawer, userData, toggleDrawer, setUserData } = props;
  const {
    account_id,
    create_date,
    date_of_birth,
    disliked_incidents,
    email,
    full_name,
    incidents,
    liked_incidents,
    disliked_incdents,
    location,
    phone_number,
    user_id,
    user_type,
  } = userData;

  const onInputChange = (key, value) => {
    let newUserData = {
      ...userData,
      disliked_incidents: { ...userData.disliked_incidents },
      incidents: { ...userData.incidents },
      liked_incidents: { ...userData.liked_incidents },
      location: { ...userData.location },
      user_type: user_type,
    };
    newUserData[key] = value;
    console.log(key, value);
    setUserData(newUserData);
  };

  const superAdminOptions = [
    {
      value: "super_admin",
      label: "Super Admin",
    },
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "normal",
      label: "Normal",
    },
    {
      value: "customer",
      label: "Customer",
    },
  ];
  const options = [
    {
      value: "admin",
      label: "Admin",
    },
    {
      value: "normal",
      label: "Normal",
    },
    {
      value: "customer",
      label: "Customer",
    },
  ];

  const updateUser = async function (updateUser) {
    axios
      .put(`${config.URL}/user/update`, updateUser)
      .then((e) => {
        console.log("success", e);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const deleteUser = async () => {
    console.log(user_id)
    await axios.delete(`${config.URL}/user/delete`, {
      data: {
        user_id: user_id,
        account_id: account_id,
      }
      })
  };

  const isDisabled = userType == "admin" || "super_admin" ? false : true;
  const isSuperAdmin = userType == "super_admin" ? true : false;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    console.log("ok");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    console.log("cancel");
  };

  return (
    <>
      <Drawer
        width={520}
        title="Details"
        onClose={() => showDrawer()}
        placement="right"
        open={toggleDrawer}
      >
        <div className="info-area">
          <p className="title">Account Id</p>
          <input
            value={account_id}
            disabled={!isSuperAdmin}
            onChange={(e) => {
              onInputChange("account_id", e.target.value);
            }}
          />
        </div>

        <div className="info-area">
          <p className="title">User Id</p>
          <input
            value={user_id}
            disabled={!isSuperAdmin}
            onChange={(e) => {
              onInputChange("user_id", e.target.value);
            }}
          />
        </div>

        <div className="info-area">
          <p className="title">Full Name</p>
          <input
            value={full_name}
            disabled={isDisabled}
            onChange={(e) => {
              onInputChange("full_name", e.target.value);
            }}
          />
        </div>

        <div className="info-area">
          <p className="title">Email</p>
          <input
            value={email}
            disabled={isDisabled}
            onChange={(e) => {
              onInputChange("email", e.target.value);
            }}
          />
        </div>

        <div className="info-area">
          <p className="title">Phone</p>
          <input
            value={phone_number}
            disabled={isDisabled}
            onChange={(e) => {
              onInputChange("phone_number", e.target.value);
            }}
          />
        </div>

        <div className="info-area">
          <p className="title">Created Date</p>
          <input
            value={create_date}
            disabled={isDisabled}
            onChange={(e) => {
              onInputChange("create_date", e.target.value);
            }}
          />
        </div>

        {/* <div className="info-area">
          <p className="title">User Type</p>
          <input value={user_type}  disabled={isDisabled} onChange={ (e) => {onInputChange('user_type',e.target.value )}}/>    
        </div>     */}

        <div className="info-area">
          <p className="title">User Type</p>
          <Cascader
            options={isSuperAdmin ? superAdminOptions : options}
            placement={"bottomRight"}
            defaultValue={user_type}
            size="large"
            style={{ width: "85%" }}
            onChange={(data) => {
              onInputChange("user_type", data[0]);
            }}
          />
        </div>

        <div className="bottom-area">
          <Button
            className="update-btn"
            onClick={() => {
              updateUser(userData);
            }}
          >
            <CheckOutlined /> Save
          </Button>

          {/* user type'a göre değişecek */}
          {true ? (
            <Button
              className="delete-btn"
              onClick={() => {
                deleteUser();
              }}
            >
              <DeleteOutlined /> Inactive
            </Button>
          ) : null}
        </div>
      </Drawer>
    </>
  );
};
export default UserRightPanel;
