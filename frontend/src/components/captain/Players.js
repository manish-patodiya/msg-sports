import React from "react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Cricket from "./players/Cricket";
import Football from "./players/Football";
import Volleyball from "./players/Volleyball";
import Badminton from "./players/Badminton";
import TableTennis from "./players/TableTennis";
import Fooseball from "./players/Fooseball";
import Carrom from "./players/Carrom";
import Chess from "./players/Chess";

const Players = () => {
  const tabs = [
    { label: "Cricket", value: "cricket", element: <Cricket /> },
    { label: "Football", value: "football", element: <Football /> },
    { label: "Volleyball", value: "volleyball", element: <Volleyball /> },
    { label: "Badminton", value: "badminton", element: <Badminton /> },
    { label: "TableTennis", value: "tabletennis", element: <TableTennis /> },
    { label: "Fooseball", value: "fooseball", element: <Fooseball /> },
    { label: "Carrom", value: "carrom", element: <Carrom /> },
    { label: "Chess", value: "chess", element: <Chess /> },
  ];
  return (
    <div>
      <div>
        <h3 className="block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-rose-800">
          Players
        </h3>
      </div>
      <div className="block w-full overflow-hidden mt-4">
        <Tabs value="cricket">
          <TabsHeader>
            {tabs.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="pt-4">
            {tabs.map(({ value, element }) => (
              <TabPanel key={value} value={value} className="py-0">
                {element}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default Players;
