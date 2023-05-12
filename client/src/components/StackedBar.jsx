import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

const StackedBar = (props) => {

  const {super_admin, admin, customer, normal} = props;
  const data = [
    {
      type: 'Super Admin',
      Count: super_admin,
    },
    {
      type: 'Admin',
      Count: admin,
    },
    {
      type: 'Customer',
      Count: customer,
    },
    {
      type: 'Normal',
      Count: normal,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'Count',
    minColumnWidth: 8,
    maxColumnWidth: 40,
    color: '#b9b7c4',
  };
  
  return <Column {...config} height={300}/>;
};

export default StackedBar;
