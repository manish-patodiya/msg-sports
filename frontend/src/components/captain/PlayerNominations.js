import React, { useEffect, useState } from "react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import Cricket from "./players/Cricket";
import Football from "./players/Football";
import Volleyball from "./players/Volleyball";
import Badminton from "./players/Badminton";
import TableTennis from "./players/TableTennis";
import Fooseball from "./players/Fooseball";
import Carrom from "./players/Carrom";
import Chess from "./players/Chess";
import { API_BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";
import axios from "axios";
import { getLoginInfo } from "../../common/common";
import PlayerNominationsTable from "./PlayerNominationsTable";

const Players = () => {
  const [games, setGames] = useState([]);
  const [nominations, setNominations] = useState({});
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    axios.get(API_BASE_URL + "events/get_nominations_data/" + getLoginInfo("captain", "house_id")).then(res => {
      if (res.data.status == 1) {
        setGames(res.data.response.games);
        setNominations(res.data.response.nominations)
      } else {
        toast.error("Something went wrong");
      }
    }).catch(err => console.log(err))
  }, []);

  const updateStatusForNominees = (game_id, data) => {
    nominations[game_id] = data;
    setNominations(nominations);
    setRerender(!rerender);
  }

  return (
    <div>
      <div>
        <h3 className="block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-rose-800">
          Players
        </h3>
      </div>
      <div className="block w-full overflow-hidden mt-4">
        <Tabs value={0}>
          <TabsHeader className="z-0">
            {games.map(({ game_name }, index) => (
              <Tab key={index} value={index}>
                {game_name}
              </Tab>
            ))}
          </TabsHeader>

          <TabsBody className="pt-4">
            {games.map((game, index) => (
              <TabPanel key={index} value={index} >
                <PlayerNominationsTable nominees={nominations[game.game_id]} updateStatusForNominees={updateStatusForNominees} game_id={game.game_id} />
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
};

export default Players;
