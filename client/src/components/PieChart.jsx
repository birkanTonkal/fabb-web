import React, { useState, useEffect } from 'react';
import { Pie, G2 } from '@ant-design/plots';
import "../styles/Statistics.scss";

function PieChart(props) {

  const G = G2.getEngine('canvas');
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

  const cfg = {
    appendPadding: 5,
    data,
    angleField: 'value',
    colorField: 'type',
    color:['#548de6','#8c8c8c', '#76bd56','#df5e68'],
    radius: 0.8,
    legend: false,
    label: {
      type: 'spider',
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: 'circle',
          attrs: {
            x: 10,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 20,
            y: 7,
            text: `${data.type}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: 'text',
          attrs: {
            x: 5,
            y: 25,
            text: `${parseFloat(data.percent * 100).toFixed(2)}%`,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
    ],
  };
  const config = cfg;
  return <Pie {...config} height={300}/>;
};

export default PieChart;