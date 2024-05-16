import React, { useEffect, useState } from "react";
import { Avatar, Button, Typography, } from "@material-tailwind/react";
import axios from 'axios';
import { API_BASE_URL, BASE_URL } from '../../constants/constant'
import { toast } from 'react-toastify';
import { getLoginInfo } from "../../common/common.js";
import UserInfoDialog from "../../common/UserInfoDialog.js";

const Team = () => {
    const TABLE_HEAD = ["Sl No", "Employee Name", "Phone no. / Email", "Action"];
    const COLUMN_WIDTH = ["8%", "23%", "49%", "20%"];
    const [players, setPlayers] = useState([]);
    const [userID, setUserID] = useState(0);

    useEffect(() => {
        const house_id = getLoginInfo("player", "house_id");
        if (!house_id) return;
        axios.get(API_BASE_URL + "players", {
            params: { house_id: house_id }
        }).then(res => {
            if (res.data.status) {
                setPlayers(res.data.response.players);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => console.log(err))
    }, [])

    const [userInfoDialog, setUserInfoDialog] = React.useState(false);
    const userInfoDialogHandler = () => setUserInfoDialog(!userInfoDialog);

    return (
        <div className="flex flex-col gap-3">
            <UserInfoDialog open={userInfoDialog} handler={userInfoDialogHandler} userID={userID} />
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
                                        <td width={COLUMN_WIDTH[4]} className="p-3 border-b border-blue-gray-50">
                                            <div className="flex flex-row">
                                                <Button size="sm" onClick={() => { setUserID(player.user_id); userInfoDialogHandler() }} variant="text" color="blue"><i className="fa-regular fa-eye"></i></Button>
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
    )
}

export default Team
