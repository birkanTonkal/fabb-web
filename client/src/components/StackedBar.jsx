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
    xField: 'total',
    yField: 'type',
    color: '#1A374D',
    yAxis: {
      label: {
        autoRotate: false,
      },
    },
    scrollbar: {
      type: 'vertical',
    },
    minBarWidth: 8,
    maxBarWidth: 12,
    // minColumnWidth: 8,
    // maxColumnWidth: 12,
    
    // xAxis: {
    //   label: {
    //     autoHide: false,
    //     autoRotate: true,
    //   },
    // },
    // slider: {
    //   start: 0,
    //   end: 0.5,
    // },
  };
  
  return <Bar {...config} data={sortedData} height={300}/>;
};

export default StackedBar;
