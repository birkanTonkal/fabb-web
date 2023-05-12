import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import "../styles/Statistics.scss";

function PieChart(props) {

  const {incidentData} = props;

  let opened = 0, rejected = 0, in_progress = 0, solved = 0;

  for(let j = 0; j< incidentData.length; j++) {
    if(incidentData[j].incident_status == "Opened") {
      opened ++;
    }
    else if(incidentData[j].incident_status == "Rejected") {
      rejected ++;
    }
    else if(incidentData[j].incident_status == "In Progress") {
      in_progress ++;
    }
    else if(incidentData[j].incident_status == "Solved") {
      solved ++;
    }
  }

  const data = [
    {
      type: 'In progress',
      value: in_progress,
    },
    {
      type: 'Opened',
      value: opened,
    },
    {
      type: 'Solved',
      value: solved,
    },
    {
      type: 'Rejected',
      value: rejected,
    },
  ];
  const config = {
    appendPadding: 5,
    data,
    angleField: 'value',
    colorField: 'type',
    color:['#448FDA','rgba(0, 0, 0, 0.65)', '#33AE10','#E85342'],   
    radius: 1,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} height={250}/>;
};

export default PieChart;