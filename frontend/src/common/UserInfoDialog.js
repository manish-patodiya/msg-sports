import { Avatar, Dialog, DialogBody, DialogFooter, DialogHeader, Rating, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, BASE_URL } from '../constants/constant'
import { toast } from 'react-toastify'
import { Button } from 'react-scroll'
import { getLoginInfo } from './common'

const UserInfoDialog = ({ open, userID, handler }) => {
    const [playerInfo, setPlayerInfo] = useState({});
    useEffect(() => {
        if (!userID) return;
        axios.get(API_BASE_URL + "players/get_player/" + userID).then(res => {
            if (res.data.status == 1) {
                setPlayerInfo(res.data.response.player);
            } else {
                handler();
                toast.error("Something went wrong");
            }
        }).catch(err => {
            console.log(err)
        })
    }, [userID])
    return (
        <Dialog open={open} handler={handler} size='xs'>
            <DialogHeader className="pb-0 flex items-start justify-between">
                <div className='flex gap-2 items-center'>
                    <Avatar size='xxl' src={BASE_URL + "profile_photo/" + (playerInfo.profile || "avatar.png")} color='gray' className='' />
                    <div>
                        <Typography as="div" variant="h5" className="mb-1 rounded-full"
                        >
                            {playerInfo.name ? playerInfo.name : " "}
                        </Typography>
                        <Typography as="div" variant="small" className="rounded-full"
                        >
                            {playerInfo.contact ? "+91 " + playerInfo.contact : " "}
                        </Typography>
                        <Typography as="div" variant="small" className="rounded-full"
                        >
                            {playerInfo.email ? playerInfo.email : " "}
                        </Typography>
                    </div>
                </div>
                <i className='fa fa-xmark cursor-pointer' onClick={handler}></i>
            </DialogHeader>
            <DialogBody className='px-6'>
                <div className='flex gap-3'>
                    <div className='w-2/5'>
                        <Typography variant='h6'>Personal Information</Typography>
                        <hr />
                        <div className=''>
                            <Typography variant='small'>Employee ID: {playerInfo.emp_id || "NA"}</Typography>
                            <Typography variant='small'>Tshirt Size: {playerInfo.tshirt || "NA"}</Typography>
                            <Typography variant='small'>Business Unit: {playerInfo.business_unit || "NA"}</Typography>
                            <Typography variant='small'>Location: {playerInfo.location || "NA"}</Typography>
                            <Typography variant='small'>Sold Amount: {playerInfo.sold_amt || (getLoginInfo("captain", "user_id") == playerInfo.user_id ? "Captain" : "Unsold")}</Typography>
                            <Typography variant='small' style={{ background: playerInfo.background && playerInfo.background, color: playerInfo.background && "white" }}>House: {playerInfo.house_name || "NA"}</Typography>
                        </div>
                    </div>
                    <div className='w-3/5'>
                        <Typography variant='h6'>Gaming stats</Typography>
                        <hr />
                        {
                            playerInfo.ratings && playerInfo.ratings.map((game, key) => {
                                return <div className='flex gap-3 items-center' key={key} >
                                    <div className='text-sm w-1/2'>
                                        {game.game_name + ": "}
                                    </div>
                                    <Rating className='text-sm' value={game.rating} readonly />
                                </div>
                            })
                        }
                    </div>
                </div>

            </DialogBody>
        </Dialog>
    )
}

export default UserInfoDialog;