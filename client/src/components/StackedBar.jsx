import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column, Bar } from '@ant-design/plots';

const StackedBar = (props) => {

  const {incidentData} = props;
  let categories = [];
  const data = [];
  var obj = {}

  function countDuplicateStrings(arr) {
    let count = {};
  
    arr.forEach(function(item) {
      if (count[item]) {
        count[item]++;
      } else {
        count[item] = 1;
      }
    });
  
    return count;
  }  

  for(let i = 0; i< incidentData.length; i++) {
    categories.push(incidentData[i].category);
  }

  let duplicateCounts = countDuplicateStrings(categories);
 
  for (let key in duplicateCounts) {
    let value = duplicateCounts[key];

    obj = { type: key, total: value };
    data.push(obj)
  }  

  const sortedData = [...data].sort((a, b) => b.total - a.total);

  const config = {
    data,
    xField: 'type',
    yField: 'total',
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    color: '#6491a4',
    columnBackground: {
      style: {
        fill: '#e3eaef',
        radius: [5, 5, 0, 0],
      },      
    },
    minColumnWidth: 17,
    maxColumnWidth: 17,
    label: {
      content: "",
    },
    columnStyle: {
      radius: [5, 5, 0, 0],
    },
  };
  
  return <Column {...config} className="stacked-bar" data={sortedData} />;
};

export default StackedBar;