import { Drawer, message, Cascader, DatePicker, Input, Button, Modal} from "antd";
import { useRef, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import "../styles/RightPanel.scss";
import "../styles/Incidents.scss";
import 'leaflet/dist/leaflet.css';
import {
  LikeOutlined,
  DislikeOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined
} from "@ant-design/icons";
import {isArray} from 'lodash'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSelector } from "react-redux";
import axios from "axios";
import { config } from "../utils/Constants";
import { MapContainer, TileLayer } from 'react-leaflet'
dayjs.extend(customParseFormat);


const IncidentRightPanel = (props) => {
  const authState = useSelector((state) => state.auth);
  const userType = authState.user_type;
  const isAdmin = userType == 'admin' || 'super_admin' ? true : false 
  const inputRef = useRef({})
  const { showDrawer, incidentData, toggleDrawer, setIncidentData, incidentPageRefresher } = props;
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
    attachments
  } = incidentData;
 
  const copy = async () => {
    await navigator.clipboard.writeText(report_number);

    message.info("Copied");
    message.config({
      duration: 2,
    });
  };


  const onInputChange = (key, value) => {
    let newIncidentData = {...incidentData, vote_counts: {...incidentData.vote_counts}, location: incidentData.location, 
      incident_status: incident_status}
    newIncidentData[key] = value;
    console.log(key, value)
    setIncidentData(newIncidentData)
  }

  const leafletMap = () => {
    console.log(location)
    let loc = JSON.parse(location);
  
    let position = [loc.latitude, loc.longitude]
    return (<div className="info-area" style={{ height: 400} }><MapContainer center={position} zoom={13} >
  
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   />
  </MapContainer></div>)
  }
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

  const updateIncident = async function(updateIncident) {
    console.log(updateIncident)
    if (isArray(updateIncident.incident_status)) { updateIncident.incident_status = updateIncident.incident_status[0]}
    axios.put(`${config.URL}/incident/update`, updateIncident).
        then(e => {
          console.log('success', e)
          incidentPageRefresher()
        }).
        catch(e => {console.log('zart', e)})
    
        message.success("Incident successfully updated");
  }
    
  const deleteIncident = (incident_id) => {
    axios.delete(`${config.URL}/incident/${incident_id}`).then(e => {
      incidentPageRefresher();
      console.log(e)
    }).catch(e => {
      console.log(e)
    })

    message.info("Incident successfully inactivated");
  }

  const isDisabled = userType == 'admin' || 'super_admin' ? false : true;

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
          <div className="title-container">
            <input className="report-number" value={report_number}>
            </input><CopyOutlined onClick={copy} />
          </div>        
        </div>
       
        <div className="info-area">
          <p className="title">Date</p>
          <input value={create_date}  disabled={isDisabled} onChange={ (e) => {onInputChange('create_date',e.target.value )}}/>    
        </div>

        <div className="info-area">
          <p className="title">Category</p>
          <input value={category} disabled={isDisabled} onChange={ (e) => {onInputChange('category',e.target.value )}} />
        </div>

        <div className="info-area">
          <p className="title">Title</p>
          <input value={title}  disabled={isDisabled} onChange={ (e) => {onInputChange('title',e.target.value )}} />
        </div>

        <div className="info-area">
          <p className="title2">Description</p>
          <textarea value={description} disabled={isDisabled} onChange={ (e) => {onInputChange('description',e.target.value )}}/>
        </div>

        <div className="info-area">
          <p className="title">Address</p>
          <textarea className="address-area" value={address} disabled={isDisabled} onChange={ (e) => {onInputChange('address', e.target.value )}}/>         
        </div>
        {/* {location &&  leafletMap()} */}
        <div className="info-area">
          <p className="title">Attachments</p>
          <img className="incident_image" src={ Array.isArray(attachments) && `https://drive.google.com/uc?export=view&id=${attachments[0].webViewLink.split('/')[5]}`  }  alt="" />
        </div>

        <div className="info-area">
          <p className="title">Votes</p>
          <LikeOutlined  className="like-icon"/> <input className="vote-area" value={vote_counts?.upvote_count} disabled={isDisabled} />
          <DislikeOutlined  className="dislike-icon"/> <input className="vote-area" value={vote_counts?.downvote_count} disabled={isDisabled} />
        </div>

        <div className="info-area">
          <p className="title">Status</p>
          <Cascader options={options} placement={"bottomRight"} defaultValue={incident_status} size="large" style={{ width: '85%'}} onChange={ (data) => {onInputChange('incident_status',data[0])}}/>
        </div>

        <div className="bottom-area">
          <Button className="update-btn" onClick={ async () => {await updateIncident(incidentData)}}><CheckOutlined /> Save</Button>
          
          { isAdmin ? <Button className="delete-btn" onClick={ async () => { await deleteIncident(incidentData.incident_id)}}><DeleteOutlined /> Inactive</Button> : null }
       
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
export default IncidentRightPanel;
