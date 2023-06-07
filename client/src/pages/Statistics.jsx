import { Card, Col, Row, Breadcrumb, Badge } from 'antd';
import React from 'react';
import PieChart from '../components/PieChart'
import StackedBar from '../components/StackedBar'
import TopThree from '../components/TopThree'
import "../styles/Statistics.scss";
import {
  UsergroupAddOutlined,
  IssuesCloseOutlined
} from "@ant-design/icons";


function Statistics(props) {

  const {incidentData, userData} = props;

  const userTitle = <Breadcrumb
    items={[
      {
        href: '',
        title: (<span>Users</span>),
      },
      {
        title: 'Number of users',
      },
    ]}
  />

  const incidentTitle = <Breadcrumb
    items={[
      {
        href: '',
        title: (<span>Incidents</span>),
      },
      {
        title: 'Number of incidents',
      },
    ]}
  />

  const { Meta } = Card;

  return (
    <>
      <Row gutter={[16, 16]} className='row'>
        <Col span={16}>
          <Card><StackedBar incidentData={incidentData}/></Card>          
        </Col>
        <Col span={8} className='number-col'>
          <Card>
            <Meta className='statistic'
              avatar={<UsergroupAddOutlined />}
              title={userTitle}
              description={[userData.length]}
            />          
          </Card>
          <Card>
            <Meta className='statistic'
              avatar={<IssuesCloseOutlined />}
              title={incidentTitle}
              description={[incidentData.length]}
            />  
          </Card> 
        </Col>
      </Row>

      <Row gutter={[16, 16]} className='row'>
        <Col span={12}>
          <Card><PieChart incidentData={incidentData}/></Card>    
        </Col>       
        
        <Col span={12}>
          <Card className='top-three'><TopThree incidentData={incidentData}/></Card>
        </Col>
      </Row>     
    </>
  )
}

export default Statistics;




 


