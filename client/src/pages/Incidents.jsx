import { Table, Badge, Tag } from "antd";
import axios from "axios";
import "../styles/Incidents.scss";
import RightPanel from "../components/RightPanel";
import {
  LikeOutlined,
  DislikeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from 'react';
import { config } from "../utils/Constants";
/* const data = [
  {
    key: "1",
    reportnumber: "AC-23478-83746",
    category: "Accident",
    title: "C title",
    date: "24-12-2005",
    votes: [-5, 20],
    status: ["In Progress"],
  },
  {
    key: "2",
    reportnumber: "AC-23478-83746",
    category: "Traffic Problem",
    title: "A title",
    date: "01-01-2005",
    votes: [-1, 86],
    status: ["Rejected"],
  },
  {
    key: "3",
    reportnumber: "AC-23478-83746",
    category: "Accident",
    title: "B title",
    date: "18-05-2013",
    votes: [-3, 6],
    status: ["Opened"],
  },
  {
    key: "4",
    reportnumber: "AC-23478-83746",
    category: "Hi",
    title: "B title",
    date: "16-08-2014",
    votes: [0, 36],
    status: ["Solved"],
  },
  {
    key: "5",
    reportnumber: "AC-23478-83746",
    category: "Accident",
    title: "C title",
    date: "03-01-1965",
    votes: [-5, 6],
    status: ["Rejected"],
  },
  {
    key: "6",
    reportnumber: "AC-23478-83746",
    category: "Traffic Problem",
    title: "A title",
    date: "07-09-2003",
    votes: [-5, 5],
    status: ["Opened"],
  },
  {
    key: "7",
    reportnumber: "AC-23478-83746",
    category: "Bove",
    title: "B title",
    date: "18-09-2003",
    votes: [-200, 300],
    status: ["Solved"],
  },
  {
    key: "8",
    reportnumber: "AC-23478-83746",
    category: "Accident",
    title: "B title",
    date: "18-05-2013",
    votes: [-5, 103],
    status: ["Solved"],
  },
  {
    key: "9",
    reportnumber: "AC-23478-83746",
    category: "Accident",
    title: "C title",
    date: "03-01-1965",
    votes: [-6, 7],
    status: ["In Progress"],
  },
  {
    key: "10",
    reportnumber: "AC-23478-83746",
    category: "Traffic Problem",
    title: "A title",
    date: "07-09-2003",
    votes: [-10, 10],
    status: ["Opened"],
  },
  {
    key: "11",
    reportnumber: "AC-23478-83746",
    category: "Bove",
    title: "B title",
    date: "18-09-2003",
    votes: [0, 100],
    status: ["Solved"],
  },
  {
    key: "12",
    reportnumber: "AC-23478-83746",
    category: "Accident",
    title: "B title",
    date: "18-05-2013",
    votes: [-7, 35],
    status: ["Rejected"],
  },
]; */

function Incidents() {

  const columns = [
    {
      title: "Report Number",
      dataIndex: "report_number",
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
      
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      
    },
    {
      title: "Date",
      dataIndex: "create_date",
      sorter: (a, b) => 
        new Date(...a.create_date.split("-").reverse()) -
        new Date(...b.create_date.split("-").reverse()),
      
    },
    {
      title: "Likes",
      dataIndex: "vote_counts",
      sorter: (a, b) => a.vote_counts.upvote_count,
      render: (votes) => (
        <div className="vote-icons">
          <div className="like"><LikeOutlined className="like-icon"/>{votes.upvote_count}</div>
        </div>
      ),
    },
    {
      title: "Dislikes",
      dataIndex: "vote_counts",
      sorter: (a, b) => a.vote_counts.downvote_count,
      render: (votes) => (
        <div className="vote-icons">
          <div className="dislike"><DislikeOutlined  className="dislike-icon"/>{votes.downvote_count}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "incident_status",
      filters: [
        {
          text: "Opened",
          value: "Opened",
        },
        {
          text: "In Progress",
          value: "In Progress",
        },
        {
          text: "Solved",
          value: "Solved",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      editable: true,
      onFilter: (value, record) => { return record.incident_status[0] == value },
      render: (status) => (       
        <>
          {status.map((tag) => {
            if (tag === "Opened") {
              return (
                <Tag icon={<ClockCircleOutlined />} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            } else if (tag === "In Progress") {
                return (
                  <Tag icon={<SyncOutlined spin />} color={"blue"} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
            } else if (tag === "Solved") {
              return (
                <Tag icon={<CheckCircleOutlined />} color={"green"} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            } else if (tag === "Rejected") {
              return (
                <Tag icon={<ExclamationCircleOutlined />} color={"red"} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            }
            
          })}
          
        </>
      ),      
    },
];
  const [incidentData, setIncidentData] = useState([])
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [incidentDetailData, setincidentDetailData] = useState({})

  const fetchIncidentData = async () => {
    const res = await axios.get(
      `${config.URL}/incident`
    );
    let incidents = res.data
    let fixedList = [];
    //console.log(res.data)
    let key = 0
    for(const incidentId in incidents) {
      incidents[incidentId].incident_status =[incidents[incidentId].incident_status]
      incidents[incidentId].key = key
      fixedList.push(incidents[incidentId])
      key += 1
    }
    setIncidentData(fixedList)
     
  }
  useEffect( () => {
    fetchIncidentData();
  }, [])
  
  const showDrawer = () => {
    setToggleDrawer(!toggleDrawer);
  };

  return (
    <>
    <Table
      className="incident-table"
      columns={columns}
      dataSource={incidentData}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {showDrawer(); setincidentDetailData(record)}, // click row
        };
      }}
      /* scroll={{
        y: 440,
      }} */
      pagination={{
        pageSize: 12,
      }}
    />
    <RightPanel toggleDrawer={toggleDrawer} showDrawer={showDrawer} incidentData={incidentDetailData}/>
    </>
  );
}
export default Incidents;
