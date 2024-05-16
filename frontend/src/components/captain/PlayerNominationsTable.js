import React from 'react'
import { Menu, MenuHandler, MenuList, MenuItem, Rating, Avatar, Typography, Button, Chip } from "@material-tailwind/react";
import { API_BASE_URL, BASE_URL } from '../../constants/constant';
import { toast } from 'react-toastify';
import axios from 'axios';
const PlayerNominationsTable = ({ nominees, updateStatusForNominees, game_id }) => {
    const TABLE_HEAD = ["Sl No", "Employee Name", "Rating", "Status"];
    const COLUMN_WIDTH = ["8%", "50%", "27%", "15%"];

    const updateStatus = (user_id, event_id, status_code) => {
        axios.post(API_BASE_URL + "events/update_nomination_status/", { user_id, event_id, status_code })
            .then(res => {
                if (res.data.status) {
                    updateStatusForNominees(game_id, nominees.map((player) => {
                        if (player.user_id === user_id) {
                            return { ...player, nomination_status: status_code };
                        } else {
                            return player;
                        }
                    }));
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                }
            }).catch(err => console.log(err));
    }
    return (
        <div className="p-4 px-0">
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
                        nominees && nominees.map((player, index) => {
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
                                                <Typography>{player.name}</Typography>
                                                <Typography variant="small"> +91 {player.contact}</Typography>
                                                <Typography variant="small" className="text-rose-800">
                                                    {player.email}
                                                </Typography>
                                            </div>
                                        </div>
                                    </td>
                                    <td width={COLUMN_WIDTH[2]} className="p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900">
                                        <Rating value={player.rating} readonly />
                                    </td>
                                    <td width={COLUMN_WIDTH[4]} className="p-3 border-b border-blue-gray-50">
                                        {player.nomination_status == 0 ?
                                            <div className="flex flex-row justify-center">
                                                <Button size="sm" variant="text" onClick={() => updateStatus(player.user_id, player.event_id, 1)}><i className="fa-solid fa-check text-green-800"></i></Button>
                                                <Button size="sm" variant="text" onClick={() => updateStatus(player.user_id, player.event_id, 2)}><i className="fa-solid fa-xmark text-red-800"></i></Button>
                                            </div> :
                                            player.nomination_status == 1 ?
                                                <Chip color='green' size='sm' value="Approved" /> :
                                                <Chip color='red' size='sm' value="Rejected" />
                                        }
                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
        </div>
    );
}

export default PlayerNominationsTable