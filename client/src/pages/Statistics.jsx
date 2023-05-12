import { Card, Col, Row, Statistic, Breadcrumb } from 'antd';
import React from 'react';
import PieChart from '../components/PieChart'
import StackedBar from '../components/StackedBar'
import "../styles/Statistics.scss";
import {
  UsergroupAddOutlined,
  IssuesCloseOutlined
} from "@ant-design/icons";

function Statistics(props) {

  const {incidentData, userData} = props;
  
  let super_admin = 0, admin = 0, customer = 0, normal = 0;  
  for(let i = 0; i< userData.length; i++) {
    if(userData[i].user_type == "super_admin") {
      super_admin ++;
    }
    else if(userData[i].user_type == "admin") {
      admin ++;
    }
    else if(userData[i].user_type == "customer") {
      customer ++;
    }
    else if(userData[i].user_type == "normal") {
      normal ++;
    }
  }

  const customerTitle = <Breadcrumb
    items={[
      {
        href: '',
        title: (
          <>
            <UsergroupAddOutlined />
            <span>Users</span>
          </>
        ),
      },
      {
        title: 'Number of customer user',
      },
    ]}
  />

  const normalTitle = <Breadcrumb
    items={[
      {
        href: '',
        title: (
          <>
            <UsergroupAddOutlined />
            <span>Users</span>
          </>
        ),
      },
      {
        title: 'Number of normal user',
      },
    ]}
  />

  const incidentTitle = <Breadcrumb
    items={[
      {
        href: '',
        title: (
          <>
            <IssuesCloseOutlined />
            <span>Incidents</span>
          </>
        ),
      },
      {
        title: 'Number of incidents',
      },
    ]}
  />
  
  return (
    <div>
      <Row gutter={[16, 16]} className='row'>
        <Col span={8}>
          <Card>
            <Statistic
              title={customerTitle}
              value={customer}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title={normalTitle}
              value={normal}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
          <Statistic
              title={incidentTitle}
              value={[incidentData.length]}
            />
          </Card>
        </Col>   

        <Col span={24} md={12}>
            <Card><StackedBar super_admin={super_admin} admin={admin} customer={customer} normal={normal}/></Card>
        </Col>
        <Col span={24} md={12}>
            <Card><PieChart incidentData={incidentData}/></Card>
        </Col>

        <Col span={24}>
          <Card>
            <Statistic
              title={customerTitle}
              value={customer}
            />
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export default Statistics;




 


