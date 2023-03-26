import { Drawer, message, Cascader, DatePicker, Input, Button, Modal} from "antd";
import { useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import "../styles/RightPanel.scss";
import "../styles/Incidents.scss";
import {
  LikeOutlined,
  DislikeOutlined,
  StopOutlined
} from "@ant-design/icons";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const { TextArea } = Input;

const RightPanel = (props) => {
  const { showDrawer, incidentData, toggleDrawer } = props;
  const {
    address,
    category,
    create_date,
    description,
    incident_id,
    incident_status,
    location,
    report_number,
    title,
    user_id,
    vote_counts,
  } = incidentData;

  const copy = async () => {
    await navigator.clipboard.writeText(report_number);

    message.info("Copied");
    message.config({
      duration: 2,
    });
  };

  const options = [
    {
      value: "Opened",
      label: "Opened"
    },
    {
      value: "In Progress",
      label: "In Progress"
    },
    {
      value: 'Solved',
      label: 'Solved'
    },
    {
      value: 'Rejected',
      label: 'Rejected'
    },
  ];

  const isDisabled = true;

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
    console.log("cancle")
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
        <div className="report-area">
          <a onClick={showModal}><StopOutlined /> Report</a>
        </div>
        <div className="info-area">
          <p className="title">Report Number</p>
          <p className="report-number">
            {report_number} <CopyOutlined onClick={copy} />
          </p>
        </div>
        <div className="info-area">
          <p className="title">Date</p>
          <input defaultValue={create_date} disabled={isDisabled}/>    
        </div>
        <div className="info-area">
          <p className="title">Category</p>
          <input defaultValue={category} disabled={isDisabled}/>
        </div>
        <div className="info-area">
          <p className="title">Title</p>
          <input defaultValue={title} disabled={isDisabled}/>
        </div>
        <div className="info-area">
          <p className="title">Description</p>
          <textarea defaultValue={description} disabled={isDisabled}/>
        </div>
        <div className="info-area">
          <p className="title">Address</p>
          <textarea className="address-area" defaultValue={"Lorem lorem"} disabled={false}/>         
        </div>
        <div className="info-area">
          <p className="title">Attachments</p>
        </div>
        <div className="info-area">
          <p className="title">Votes</p>
          <LikeOutlined  className="like-icon"/> <input className="vote-area" value={vote_counts?.upvote_count} disabled={isDisabled}/>
          <DislikeOutlined  className="dislike-icon"/> <input className="vote-area" value={vote_counts?.downvote_count} disabled={isDisabled}/>
        </div>
        <div className="info-area">
          <p className="title">Status</p>
          <Cascader options={options} placement={"bottomRight"} defaultValue={incident_status} size="large" style={{ width: '85%'}}/>
        </div>

        <div className="bottom-area">
          <Button>Save</Button>
        </div>

        <Modal title="Report" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Report" style={{
          top: 150,
          
        }}>
          <p>Are you sure you want to report this incident?</p>
        </Modal>
      </Drawer>
    </>
  );
};
export default RightPanel;
