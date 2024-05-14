import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

import { Chart } from "react-google-charts";
const Dashboard = () => {
  const data = [
    ["Player Status", "Status"],
    ["Pending", 50],
    ["Approved", 100],
    ["rejected", 30]
  ];

  const options = {
    title: "Player Registeration",
    is3D: true,
  };
  return (
    <div >
      <div className="flex gap-3">
        <Card className="border w-1/4 h-28 bg-blue-900 text-white hover:-translate-y-1 hover:scale-105 duration-300 cursor-pointer">
          <CardBody>
            <Typography>Players</Typography>
            <Typography>99</Typography>
          </CardBody>
        </Card>
        <Card className="border w-1/4 h-28 bg-green-600 text-white hover:-translate-y-1 hover:scale-105 duration-300
         cursor-pointer">
          <CardBody>
            <Typography>Houses</Typography>
            <Typography>99</Typography>
          </CardBody>
        </Card>
        <Card className="border w-1/4 h-28 bg-pink-600 text-white hover:-translate-y-1 hover:scale-105 duration-300
         cursor-pointer">
          <CardBody>
            <Typography>Games</Typography>
            <Typography>99</Typography>
          </CardBody>
        </Card>
        <Card className="border w-1/4 h-28 bg-red-600 text-white hover:-translate-y-1 hover:scale-105 duration-300
         cursor-pointer">
          <CardBody>
            <Typography>Event</Typography>
            <Typography>99</Typography>
          </CardBody>
        </Card>
      </div>
      <div className="-ms-36">
        <Chart
          chartType="PieChart"
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
