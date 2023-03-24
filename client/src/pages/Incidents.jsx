import { Table, Badge } from "antd";
import "../styles/Incidents.scss";

import {
  LikeOutlined,
  DislikeOutlined
} from "@ant-design/icons";

const data = [
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
];

function Incidents() {
  const columns = [
    {
      title: "Report Number",
      dataIndex: "reportnumber",
      width: "20%",
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
      dataIndex: "date",
      sorter: (a, b) =>
        new Date(...a.date.split("-").reverse()) -
        new Date(...b.date.split("-").reverse()),
    },
    {
      title: "Votes",
      dataIndex: "votes",
      sorter: (a, b) => a.votes[0] + a.votes[1] - (b.votes[0] + b.votes[1]),
      render: (votes) => (
        <div className="vote-icons">
          <div className="like"><LikeOutlined className="like-icon"/>{votes[1]}</div>
          <div className="dislike"><DislikeOutlined  className="dislike-icon"/>{votes[0]}</div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
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
      onFilter: (value, record) => record.status.toString().startsWith(value),
      render: (status) => (
        <>
          {status.map((tag) => {
            if (tag === "Opened") {
              return <Badge status="default" text="Opened" />;
            } else if (tag === "In Progress") {
              return <Badge status="processing" text="In Progress" />;
            } else if (tag === "Solved") {
              return <Badge status="success" text="Solved" />;
            } else if (tag === "Rejected") {
              return <Badge status="error" text="Rejected" />;
            }
          })}
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{
        y: 440,
      }}
      // pagination={{
      //   pageSize: 7,
      // }}
    />
  );
}
export default Incidents;
