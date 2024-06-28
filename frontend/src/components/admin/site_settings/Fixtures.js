import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  Typography,
  Select,
  Option,
  TabPanel,
  TabsBody,
  CardHeader,
} from "@material-tailwind/react"; // Assuming you are using Material-UI components
 
const Fixture = () => {
  const [gamesValue, setGamesValue] = useState("0"); // State for Singles dropdown
  const TABLE_HEAD = ["Team 1", "Team 2", "Game"];
  const Gender = [
    { label: "Men", value: "men" },
    { label: "Women", value: "women" },
  ];
  const TABLE_FOOTBall = ["House 1", "House 2", "Winner"];
  const [selectedTab, setSelectedTab] = useState("men");
 
  // Table components or content corresponding to each option
  const renderTable = (value) => {
    switch (value) {
      case "8": // Table Tennis Doubles
        return (
          <div>
            <div className="block overflow-hidden mt-1">
              <table className="w-full table-auto text-left min-w-max">
                <thead className="text-center">
                  <tr>
                    {TABLE_FOOTBall.map((head) => (
                      <th
                        key={head}
                        className="p-3 border-y border-blue-gray-100 bg-rose-800 text-white opacity-1000"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* Example rows */}
                <tbody>
                  <tr className="text-center">
                    <td> Messi</td>
                    <td>Ronaldo</td>
                    <td>Match 1</td>
                  </tr>
                  <tr className="text-center">
                    <td>Neymar</td>
                    <td>Mbappe</td>
                    <td>Match 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case "9": // Table Tennis Doubles
        return (
          <div>
            <div className="block overflow-hidden mt-1">
              <table className="w-full table-auto text-left min-w-max">
                <thead className="text-center">
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="p-3 border-y border-blue-gray-100 bg-rose-800 text-white opacity-1000"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        );
      default:
        return (
          // <CardHeader
          //   floated={false}
          //   shadow={false}
          //   className="rounded-none w-800"
          // >
          <Tabs value={selectedTab} onChange={setSelectedTab}>
            <TabsHeader className="z-0">
              {Gender.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              <div>
                <div className="block overflow-hidden mt-1">
                  <table className="w-full table-auto text-left min-w-max rounded-full">
                    <thead className="text-center">
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="p-3 border-y border-blue-gray-100 bg-rose-800 text-sm text-white opacity-1000"
                          >
                            {head}
                          </th>
                        ))}
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </TabsBody>
          </Tabs>
        );
    }
  };
 
  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h4" className="text-rose-800">
          Fixtures
          <div class="relative bg-clip-border mt-4 mx-4 overflow-hidden bg-white text-gray-700 rounded-none w-800"></div>
        </Typography>
        <div className="flex w-80 gap-14">
          {/* Singles dropdown */}
          <Select
            label="Games"
            id="games"
            value={gamesValue}
            onChange={(val) => {
              setGamesValue(val);
            }}
          >
            <Option value="0">Badminton Singles</Option>
            <Option value="1">Carrom Singles</Option>
            <Option value="2">Table Tennis Singles</Option>
            <Option value="3">Foosball</Option>
            <Option value="4">Badminton Doubles</Option>
            <Option value="5">Carrom Doubles</Option>
            <Option value="6">Table Tennis Doubles</Option>
            <Option value="7">Cricket</Option>
            <Option value="8">Football</Option>
            <Option value="9">Chess</Option>
          </Select>
        </div>
      </div>
 
      <div className="mt-4 mx-0">{renderTable(gamesValue)}</div>
 
      {/* Render the corresponding table based on selected values */}
    </div>
  );
};
 
export default Fixture;