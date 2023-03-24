import { Drawer, message, Cascader} from "antd";
import "../styles/RightPanel.scss";

import { CopyOutlined } from "@ant-design/icons";

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

  const onChange = (value) => {
    console.log(value);
    incidentData.incident_status = value;
    value = incident_status;
  };

  return (
    <>
      <Drawer
        width={500}
        title="Details"
        onClose={() => showDrawer()}
        placement="right"
        open={toggleDrawer}
      >
        <div className="info-area">
          <p className="title">Report Number</p>
          <p className="report-number">
            {report_number} <CopyOutlined onClick={copy} />
          </p>
        </div>
        <div className="info-area">
          <p className="title">Date</p>
          <p>{create_date}</p>
        </div>
        <div className="info-area">
          <p className="title">Category</p>
          <p>{category}</p>
        </div>
        <div className="info-area">
          <p className="title">Title</p>
          <p>{title}</p>
        </div>
        <div className="info-area">
          <p className="title">Description</p>
          <p>{description}</p>
        </div>
        <div className="info-area">
          <p className="title">Address</p>
          <p>{address}</p>
        </div>
        <div className="info-area">
          <p className="title">Attachments</p>
          <p>{}</p>
        </div>
        <div className="info-area">
          <p className="title">Votes</p>
          <p>{}</p>
        </div>
        <div className="info-area">
          <p className="title">Status</p>
          <p><Cascader options={options} onChange={onChange} defaultValue={incident_status}/></p>
        </div>

      </Drawer>
    </>
  );
};
export default RightPanel;
