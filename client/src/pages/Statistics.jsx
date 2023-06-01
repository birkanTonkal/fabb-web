import { Card, Col, Row, Statistic, Breadcrumb, Badge } from 'antd';
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

  const superAdminTitle = <Breadcrumb
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
        title:
        (
          <>
            <Badge status="error" />Super admin 
          </>
        ),
      },
    ]}
  />

  const adminTitle = <Breadcrumb
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
        title:
        (
          <>
            <Badge status="warning" />Admin
          </>
        ),
      },
    ]}
  />

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
        title:
        (
          <>
            <Badge status="success" />Customer
          </>
        ),
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
        title:
        (
          <>
            <Badge status="default" />Normal
          </>
        ),
      },
    ]}
  />

  const userTitle = <Breadcrumb
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
        title: 'Number of users',
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
      <Row gutter={[16, 16]}>
        <Col span={12} lg={6}>
            <Card className='card'>
              <Statistic
                title={superAdminTitle}
                value={super_admin}
              />
            </Card>
            <Card className='card'>
              <Statistic
                title={normalTitle}
                value={normal}
            />
            </Card>                       
            <Card className='card'>
              <Statistic
                title={userTitle}
                value={[userData.length]}
              />
            </Card>        
        </Col>

        <Col span={12} lg={6}>
            <Card className='card'>
              <Statistic
                title={adminTitle}
                value={admin}
              />
            </Card>
            <Card className='card'>
              <Statistic
                  title={customerTitle}
                  value={customer}
              />
            </Card>
            <Card className='card'>
              <Statistic
                  title={incidentTitle}
                  value={[incidentData.length]}
              />
            </Card>
        </Col>

        <Col span={24} lg={12} className='pie-col'>
          <Card className='card pie'><PieChart incidentData={incidentData}/></Card>
        </Col>              
      </Row>

      <Col span={24}>
          <Card className='card'><StackedBar incidentData={incidentData}/></Card>          
      </Col>                             
    </div>
  )
}

export default Statistics;




 


