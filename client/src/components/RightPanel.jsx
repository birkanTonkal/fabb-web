import { Button, Drawer } from 'antd';



const RightPanel = (props) => {
const {showDrawer, incidentData, toggleDrawer} = props
const {address, category, create_date, description, incident_id, 
  incident_status, location, report_number, title, user_id, vote_counts} = incidentData

  return (
    <>
      <Drawer title="Basic Drawer" onClose={() => showDrawer()} placement="right" open={toggleDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        {create_date}
      </Drawer>
    </>
  );
};
export default RightPanel;