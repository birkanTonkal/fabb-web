import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';
import PieChart from '../components/PieChart'

function Statistics(props) {

  const {incidentData, userData} = props;

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Users"
              value={[userData.length]}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
          <Statistic
              title="Incidents"
              value={[incidentData.length]}
            />
          </Card>
        </Col>        
      </Row>

      <PieChart/>

    </div>
  )
}

export default Statistics;




 


