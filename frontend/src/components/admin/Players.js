import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, Option, Select, Typography, } from "@material-tailwind/react";
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../../constants/constant'
import { toast } from 'react-toastify';
import PlayerBidingDiaglog from "./PlayerBidingDiaglog";
import UserInfoDialog from "../../common/UserInfoDialog";

const Players = () => {
  const TABLE_HEAD = ["Sl No", "Employee Name", "Phone no. / Email", "Status", "Action"];
  const COLUMN_WIDTH = ["8%", "25%", "35%", "17%", "15%"];
  const [search, setSearch] = useState("");
  const [players, setPlayers] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    if (!search || search.length >= 3 || filterStatus != "") {
      axios.get(API_BASE_URL + "players", {
        params: { search, status: filterStatus }
      })
        .then(res => {
          if (res.data.status) {
            setPlayers(res.data.response.players);
          } else {
            toast.error(res.data.message);
          }
        }).catch(err => console.log(err))
    }
  }, [search, filterStatus])


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

  const [assignHouseDialog, setAssignHouseDialog] = React.useState(false);
  const assignHouseDialogHandler = () => setAssignHouseDialog(!assignHouseDialog);

  const [userInfoDialog, setUserInfoDialog] = React.useState(false);
  const userInfoDialogHandler = () => setUserInfoDialog(!userInfoDialog);


  return (
    <div className="flex flex-col gap-3">
      <UserInfoDialog open={userInfoDialog} handler={userInfoDialogHandler} userID={userID} />
      <PlayerBidingDiaglog open={assignHouseDialog} handler={assignHouseDialogHandler} userID={userID} />
      <div className="flex justify-between">
        <Typography variant="h4" className="text-rose-800">
          Players
        </Typography>
        <div className="flex gap-3">
          <Select label="Filter" size="md" value="" onChange={(val) => setFilterStatus(val)}>
            <Option value="">All</Option>
            <Option value="0">Pending</Option>
            <Option value="1">Approved</Option>
            <Option value="2">Rejected</Option>
          </Select>
          <Input label="Search" onChange={(e) => { setSearch(e.target.value) }} icon={<i className="fas fa-search h-5 w-5" />} />
        </div>
      </div>
      <div>
        <table className="w-full table-auto text-left min-w-max">
          <thead className='table' style={{ width: "calc(100% - 16px)" }}>
            <tr className='w-full'>
              {TABLE_HEAD.map((head, key) => {
                return (
                  <th key={key} className={`p-3 border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-blue-gray-900 opacity-70 ${key + 1 == COLUMN_WIDTH.length ? "text-center" : ""}`} width={COLUMN_WIDTH[key]}>
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
                    <td width={COLUMN_WIDTH[4]} className="p-3 border-b border-blue-gray-50 text-center">
                      <div className="flex flex-row justify-center">
                        {player.status == 0 ? <>
                          <Button size="sm" variant="text" onClick={() => updateStatus(player.user_id, 1)}><i className="fa-solid fa-check text-green-800"></i></Button>
                          <Button size="sm" variant="text" onClick={() => updateStatus(player.user_id, 2)}><i className="fa-solid fa-xmark text-red-800"></i></Button>
                        </> :
                          player.status == 1 &&
                          <>
                            <Button size="sm" onClick={() => { setUserID(player.user_id); userInfoDialogHandler() }} variant="text" color="blue"><i className="fa-regular fa-eye"></i></Button>
                            <Button size="sm" onClick={() => { setUserID(player.user_id); assignHouseDialogHandler() }} variant="text" color="orange"><i className="fa fa-arrow-up"></i></Button>
                          </>
                        }
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
