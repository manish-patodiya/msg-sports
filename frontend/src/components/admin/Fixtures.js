import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  Typography,
  Select,
  Option,
  TabsBody,
} from "@material-tailwind/react"; // Assuming you are using Material-UI components
import { API_BASE_URL } from "../../constants/constant"; // Adjust the import path based on your project structure
import { toast } from "react-toastify";
import axios from "axios";

const Fixture = () => {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [winner, setWinner] = useState([]);
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

  const fetchData = (event_id) => {
    axios
      .all([
        axios.get(`${API_BASE_URL}fixtures/${event_id}/team1`),
        axios.get(`${API_BASE_URL}fixtures/${event_id}/team2`),
        axios.get(`${API_BASE_URL}fixtures/${event_id}/winner`),
      ])
      .then(
        axios.spread((team1Res, team2Res, winnerRes) => {
          if (team1Res.data.status && team2Res.data.status && winnerRes.data.status) {
            setTeam1(team1Res.data.response.Fixtures.result);
            setTeam2(team2Res.data.response.Fixtures.result);
            setWinner(winnerRes.data.response.Fixtures.result);
          } else {
            toast.error("Failed to load fixtures data");
          }
        })
      )
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load fixtures data");
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
              fetchData(val);
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
                  <tbody className="text-center">
                    {team1.map((team1Item, index) => (
                      <tr key={index}>
                        <td class="border-2 border-blue-gray-600 ...">{team1Item.team1_name}</td>
                        <td  class="border-2 border-blue-gray-600 ...">{team2[index]?.team2_name}</td>
                        <td  class="border-2 border-blue-gray-600 ...">{winner[index]?.winner_name}</td>
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
