import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

import { Chart } from "react-google-charts";
const Dashboard = () => {
  const data = [
    ["Games", "count"],
    ["Cricket", 14],
    ["Football", 10],
    ["Fooseball", 12],
    ["Badminton", 8],
    ["Box Cricket", 12],
    ["Table Tennis", 22],
    ["Chess", 4],
    ["Carrom", 15]
  ];

  const options = {
    title: "Teams overview",
    is3D: true,
  };
  return (
    <div >
      <div className="flex gap-3">
        <Card className="border w-1/4 h-28 bg-teal-500 text-white hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer">
          <CardBody>
            <Typography>House Members</Typography>
            <Typography>32</Typography>
          </CardBody>
        </Card>
        <Card className="border w-1/4 h-28 bg-orange-500 text-white hover:-translate-y-1 hover:scale-105 duration-300
         cursor-pointer">
          <CardBody>
            <Typography>Wining Points</Typography>
            <Typography>800 / 1000</Typography>
          </CardBody>
        </Card>
        <Card className="border w-1/4 h-28 bg-purple-600 text-white hover:-translate-y-1 hover:scale-105 duration-300
         cursor-pointer">
          <CardBody>
            <Typography>Total Games</Typography>
            <Typography>8</Typography>
          </CardBody>
        </Card>
      </div>
      <div className="-ms-12">
        <Chart
          chartType="BarChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
