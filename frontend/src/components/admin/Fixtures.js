import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
  Typography,
  Select,
  Option,
  TabsBody,
} from "@material-tailwind/react"; // Assuming you are using Material-UI components
import { API_BASE_URL } from "../../constants/constant"; // Adjust the import path based on your project structure
import { toast } from "react-toastify";
import axios from "axios";

const Fixture = () => {
  const [fixtures, setFixtures] = useState([]);
  const [eventOptions, setEventOptions] = useState([]);
  const TABLE_HEAD = ["Team 1", "Team 2", "Winner"];

  useEffect(() => {
    axios
      .get(API_BASE_URL + "eventname")
      .then((res) => {
        if (res.data.status) {
          setEventOptions(res.data.response.events.result);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load games options");
      });
  }, []);

  // Table components or content corresponding to each option
  const fetchEventFixtures = (event_id) => {
    axios
      .get(API_BASE_URL + "fixtures/" + event_id)
      .then((res) => {
        if (res.data.status) {
          setFixtures(res.data.response.Fixtures);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h4" className="text-rose-800">
          Fixtures
          <div className="relative bg-clip-border mt-4 mx-4 overflow-hidden bg-white text-gray-700 rounded-none w-800"></div>
        </Typography>
        <div className="flex w-80 gap-14">
          <Select
            label="Events"
            id="events"
            onChange={(val) => {
              fetchEventFixtures(val);
            }}
          >
            {eventOptions.map((event) => (
              <Option key={event.id} value={event.id}>
                {event.event_name}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className="mt-4 mx-0">
        <Tabs>
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
                  <tbody>
                    {fixtures.map((fixture, index) => (
                      <tr key={index} className="text-center">
                        <td>{fixture.team1_id}</td>
                        <td>{fixture.team2_id}</td>
                        <td>{fixture.winner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default Fixture;

// import React, { useEffect, useState } from "react";
// import {
//   Tabs,
//   TabsHeader,
//   Tab,
//   Typography,
//   Select,
//   Option,
//   TabPanel,
//   TabsBody,
//   CardHeader,
// } from "@material-tailwind/react"; // Assuming you are using Material-UI components
// import { API_BASE_URL } from "../../constants/constant"; // Adjust the import path based on your project structure
// import { toast } from "react-toastify";
// import axios from "axios";
// import Games from "./Games";

// const Fixture = () => {
//   const [fixtures, getFixtures] = useState([]);
//   const [gamesValue, setGamesValue] = useState("0"); // State for Singles dropdown
//   const [gamesOptions, getGameOptions] =  useState([]);
//   const TABLE_HEAD = ["Team 1", "Team 2", "Winner"];
//   const TABLE_CHESS = ["Player 1", "Player 2", "Winner"];
//   const Gender = [
//     { label: "Men", value: "men" },
//     { label: "Women", value: "women" },
//   ];
//   const TABLE_FOOTBALL = ["House 1","VS", "House 2", "Winner"];
//   const [selectedTab, setSelectedTab] = useState("men");
//   useEffect(() => {
//     axios.get(API_BASE_URL + "fixtures")
//       .then(res => {
//         if (res.data.status) {
//           getFixtures(res.data.response.fixtures);
//         } else {
//           toast.error(res.data.message);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);

//   // Table components or content corresponding to each option
//   const renderTable = (value) => {
//     switch (value) {
//       case "8": // Football
//         return (
//           <div>
//             <div className="block overflow-hidden mt-1">
//               <table className="w-full table-auto text-left min-w-max">
//                 <thead className="text-center">
//                   <tr>
//                     {TABLE_FOOTBALL.map((head) => (
//                       <th
//                         key={head}
//                         className="p-3 border-y border-blue-gray-100 bg-rose-800 text-white opacity-1000"
//                       >
//                         {head}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="text-center">

//                   </tr>
//                   <tr className="text-center">

//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       case "9": // Chess
//         return (
//           <div>
//             <div className="block overflow-hidden mt-1">
//               <table className="w-full table-auto text-left min-w-max">
//                 <thead className="text-center">
//                   <tr>
//                     {TABLE_HEAD.map((head) => (
//                       <th
//                         key={head}
//                         className="p-3 border-y border-blue-gray-100 bg-rose-800 text-white opacity-1000"
//                       >
//                         {head}
//                       </th>

//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                 {fixtures.map((fixtures, index) => (
//                         <tr key={index} className="text-center">
//                           <td>{fixtures.team1_id}</td>
//                           <td>{fixtures.team2_id}</td>
//                         </tr>
//                       ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       default:
//         return (
//           // <CardHeader
//           //   floated={false}
//           //   shadow={false}
//           //   className="rounded-none w-800"
//           // >
//           <Tabs value={selectedTab} onChange={setSelectedTab}>
//             <TabsHeader className="z-0">
//               {Gender.map(({ label, value }) => (
//                 <Tab key={value} value={value}>
//                   {label}
//                 </Tab>
//               ))}
//             </TabsHeader>
//             <TabsBody>
//               <div>
//                 <div className="block overflow-hidden mt-1">
//                   <table className="w-full table-auto text-left min-w-max rounded-full">
//                     <thead className="text-center">
//                       <tr>
//                         {TABLE_HEAD.map((head) => (
//                           <th
//                             key={head}
//                             className="p-3 border-y border-blue-gray-100 bg-rose-800 text-sm text-white opacity-1000"
//                           >
//                             {head}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                   </table>
//                 </div>
//               </div>
//             </TabsBody>
//           </Tabs>
//         );
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between">
//         <Typography variant="h4" className="text-rose-800">
//           Fixtures
//           <div class="relative bg-clip-border mt-4 mx-4 overflow-hidden bg-white text-gray-700 rounded-none w-800"></div>
//         </Typography>

//         <div className="flex w-80 gap-14">
//           <Select
//             label="Games"
//             id="games"
//             value={gamesValue}
//             onChange={(val) => {
//               setGamesValue(val);
//             }}>
//             {/* {gamesOptions.map((game, index) => (
//                 <Option key={index} value={game.id}>
//                   {game.name}
//                 </Option>))}
//             </Select>
//             </div> */}

//              <Option value="0">Badminton Singles</Option>
//             <Option value="1">Carrom Singles</Option>
//             <Option value="2">Table Tennis Singles</Option>
//             <Option value="3">Foosball</Option>
//             <Option value="4">Badminton Doubles</Option>
//             <Option value="5">Carrom Doubles</Option>
//             <Option value="6">Table Tennis Doubles</Option>
//             <Option value="7">Cricket</Option>
//             <Option value="8">Football</Option>
//             <Option value="9">Chess</Option>
//           </Select>
//         </div>
//        </div>

//       <div className="mt-4 mx-0">{renderTable(gamesValue)}</div>

//     </div>
//   );
// };

// export default Fixture;
