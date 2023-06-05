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
  
  // let super_admin = 0, admin = 0, customer = 0, normal = 0;  
  // for(let i = 0; i< userData.length; i++) {
  //   if(userData[i].user_type == "super_admin") {
  //     super_admin ++;
  //   }
  //   else if(userData[i].user_type == "admin") {
  //     admin ++;
  //   }
  //   else if(userData[i].user_type == "customer") {
  //     customer ++;
  //   }
  //   else if(userData[i].user_type == "normal") {
  //     normal ++;
  //   }
  // }

  // const superAdminTitle = <Breadcrumb
  //   items={[
  //     {
  //       href: '',
  //       title: (
  //         <>
  //           <UsergroupAddOutlined />
  //           <span>Users</span>
  //         </>
  //       ),
  //     },
  //     {
  //       title:
  //       (
  //         <>
  //           <Badge status="error" />Super admin 
  //         </>
  //       ),
  //     },
  //   ]}
  // />

  // const adminTitle = <Breadcrumb
  //   items={[
  //     {
  //       href: '',
  //       title: (
  //         <>
  //           <UsergroupAddOutlined />
  //           <span>Users</span>
  //         </>
  //       ),
  //     },
  //     {
  //       title:
  //       (
  //         <>
  //           <Badge status="warning" />Admin
  //         </>
  //       ),
  //     },
  //   ]}
  // />

  // const customerTitle = <Breadcrumb
  //   items={[
  //     {
  //       href: '',
  //       title: (
  //         <>
  //           <UsergroupAddOutlined />
  //           <span>Users</span>
  //         </>
  //       ),
  //     },
  //     {
  //       title:
  //       (
  //         <>
  //           <Badge status="success" />Customer
  //         </>
  //       ),
  //     },
  //   ]}
  // />

  // const normalTitle = <Breadcrumb
  //   items={[
  //     {
  //       href: '',
  //       title: (
  //         <>
  //           <UsergroupAddOutlined />
  //           <span>Users</span>
  //         </>
  //       ),
  //     },
  //     {
  //       title:
  //       (
  //         <>
  //           <Badge status="default" />Normal
  //         </>
  //       ),
  //     },
  //   ]}
  // />

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
      <Row gutter={[20, 20]} className='row'>
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

      <Row gutter={[20, 20]} className='row'>
        <Col span={8}>
          <Card><PieChart incidentData={incidentData}/></Card>    
        </Col>
        <Col span={8}>
          <Card></Card>    
        </Col>
        <Col span={8}>
          <Card></Card> 
        </Col>
      </Row>
    
    </>
  )
}

export default Statistics;




 


