import { Select, Typography, Option, Button, Avatar } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL, BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";

const Captains = () => {
  const TABLE_HEAD = ["Captain Info", "House Info", "Actions"];
  const COLUMN_WIDTH = ["50%", "40%", "10%"];
  const [captains, setCaptains] = useState([]);
  const [houses, setHouses] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectBG, setSelectBG] = useState("white");
  const [houseID, setHouseID] = useState(0);
  const [playerID, setPlayerID] = useState(0);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios.get(API_BASE_URL + "captains").then(res => {
      if (res.data.status == 1) {
        setCaptains(res.data.response.captains_list);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      console.log(err)
    })

    axios.get(API_BASE_URL + "houses").then(res => {
      if (res.data.status == 1) {
        setHouses(res.data.response.houses);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })

    axios.get(API_BASE_URL + "players/eligible_for_captain").then(res => {
      if (res.data.status == 1) {
        setPlayers(res.data.response.players);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      console.log(err)
    })
  }, [reload])


  const resetStates = () => {
    setHouseID(0);
    setPlayerID(0);
    setPlayers([]);
    setHouses([]);
    setSelectBG("white");
    setReload(!reload);
  }

  const addCaptain = (e) => {
    e.preventDefault();
    if (!houseID) {
      toast.info("Please choose a house");
      return;
    }

    if (!playerID) {
      toast.info("Plase choose a player");
      return;
    }

    axios.post(API_BASE_URL + 'captains/make_captain', { house_id: houseID, player_id: playerID }).then(res => {
      if (res.data.status == 1) {
        toast.success(res.data.message);
        resetStates();
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      console.log(err);
    })
    console.log(houseID, playerID)
  }

  const deleteCaptain = (cap_id) => {
    const con = window.confirm("Are you sure?");
    if (!con) return;

    axios.delete(API_BASE_URL + "captains/" + cap_id).then(res => {
      if (res.data.status == 1) {
        resetStates();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h4" className="text-rose-800">
        Captains
      </Typography>
      <div className="flex gap-3">
        <div className="w-2/3">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th width={COLUMN_WIDTH[index]} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-3" key={index}>
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {captains.map((captain, index) => {
                return (
                  <tr key={index}>
                    <td className="p-3 border-y border-blue-gray-100">
                      <div className="flex flex-col">
                        <Typography variant="small">{captain.name}</Typography>
                        <Typography variant="small" color="gray">{captain.email}</Typography>
                        <Typography variant="small" color="gray">{captain.contact}</Typography>
                      </div>
                    </td>
                    <td className="p-3 border-y border-blue-gray-100" style={{ backgroundColor: captain.background }}>
                      <div className="text-white flex items-center gap-2">
                        <Avatar variant="square" src={BASE_URL + "houses/" + captain.image} />
                        <Typography variant="small">{captain.house_name}</Typography>
                      </div>
                    </td>
                    <td className="p-3 border-y text-center border-blue-gray-100">
                      <Button size="sm" variant="outlined" color="red" onClick={() => deleteCaptain(captain.cap_id)}><i className="fas fa-trash"></i></Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="w-1/3">
          <form className="flex flex-col gap-3" onSubmit={addCaptain}>
            <Select label="House" className="text-white" style={{ backgroundColor: selectBG }} onChange={(e) => setHouseID(e)} lockScroll={false} >
              {
                houses.map((house, index) => {
                  if (!house.cap_id)
                    return <Option onClick={() => setSelectBG(house.background)} className="text-white mb-1" style={{ backgroundColor: house.background }} key={index} value={`${house.house_id}`}>{house.house_name}</Option>
                  return ""
                })
              }
            </Select>

            <Select label="Player" onChange={e => setPlayerID(e)} lockScroll={false} >
              {players.map((player, index) => {
                if (!player.cap_id)
                  return <Option key={index} value={`${player.user_id}`}>
                    {player.name} | {player.email}
                  </Option>
                return ""
              })}
            </Select>
            <Button type="submit" className="bg-rose-800">Save</Button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Captains;
