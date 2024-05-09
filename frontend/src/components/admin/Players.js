import React, { useEffect, useState } from "react";
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList, Typography, } from "@material-tailwind/react";
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../../constants/constant'
import { toast } from 'react-toastify';

const Players = () => {
  const TABLE_HEAD = ["Sl No", "Employee Name", "Phone no. / Email", "Status", "Action"];
  const COLUMN_WIDTH = ["8%", "25%", "35%", "17%", "15%"];
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get(API_BASE_URL + "players")
      .then(res => {
        if (res.data.status) {
          setPlayers(res.data.response.players);
        } else {
          toast.error(res.data.message);
        }
      }).catch(err => console.log(err))
  }, [])


  const updateStatus = (user_id, status_code) => {
    axios.post(API_BASE_URL + "players/update_player_status/" + user_id + "/" + status_code)
      .then(res => {
        if (res.data.status) {
          toast.success(res.data.message);
          setPlayers(players.map((player) => {
            if (player.user_id === user_id) {
              return { ...player, status: status_code };
            } else {
              return player;
            }
          }));
        } else {
          toast.error(res.data.message);
        }
      }).catch(err => console.log(err));
  }

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h4" className=" text-rose-800">
        Players
      </Typography>
      <div>
        <table className="w-full table-auto text-left min-w-max">
          <thead className='table' style={{ width: "calc(100% - 16px)" }}>
            <tr className='w-full'>
              {TABLE_HEAD.map((head, key) => {
                return (
                  <th key={key} className="p-3 border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-blue-gray-900 opacity-70" width={COLUMN_WIDTH[key]}>
                    {head}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className='overflow-y-scroll h-96 block w-full'>
            {
              players.map((player, index) => {
                let classes = "";
                if (player.status == 0) classes = "text-yellow-900 bg-yellow-500/20"
                else if (player.status == 1) classes = "text-green-900 bg-green-500/20"
                else classes = "text-red-900 bg-red-500/20";

                return (
                  <tr key={index} className="table w-full">
                    <td width={COLUMN_WIDTH[0]} className="p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900">
                      {index + 1}
                    </td>
                    <td width={COLUMN_WIDTH[1]} className="p-3 border-b border-blue-gray-50">
                      <div className="flex items-center gap-3">
                        <Avatar src={BASE_URL + "profile_photo/" + (player.profile || "avatar.png")} alt="avatar" />
                        <div className="flex flex-col text-sm antialiased capitalize">
                          {player.name}
                        </div>
                      </div>
                    </td>
                    <td width={COLUMN_WIDTH[2]} className="p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900">
                      <Typography variant="small">
                        +91 {player.contact}
                      </Typography>
                      <Typography variant="small" className="text-rose-800">
                        {player.email}
                      </Typography>
                    </td>
                    <td width={COLUMN_WIDTH[3]} className="p-3 border-b border-blue-gray-50">
                      <div className={`px-2 py-1 font-sans text-xs font-bold uppercase rounded-md ${classes}`}>{player.status == 0 ? "Pending" : (player.status == 1 ? "Approved" : "Rejected")}</div>
                    </td>
                    <td width={COLUMN_WIDTH[4]} className="p-3 border-b border-blue-gray-50">
                      <div className="flex flex-row">
                        {player.status == 0 ? <>
                          <Button size="sm" variant="text" onClick={() => updateStatus(player.user_id, 1)}><i className="fa-solid fa-check text-green-800"></i></Button>
                          <Button size="sm" variant="text" onClick={() => updateStatus(player.user_id, 2)}><i className="fa-solid fa-xmark text-red-800"></i></Button>
                        </> : <Button size="sm" variant="text"><i className="fa-regular fa-eye"></i></Button>}
                      </div>
                    </td>
                  </tr>
                );
              })
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
