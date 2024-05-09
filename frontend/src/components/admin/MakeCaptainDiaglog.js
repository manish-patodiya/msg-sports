import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../constants/constant'
import axios from 'axios'
import { toast } from 'react-toastify'

const MakeCaptainDiaglog = ({ open, handler, house_data }) => {
    const TABLE_HEAD = ['Name', 'Email', 'Contact', 'Actions'];
    const COLUMN_WIDTH = ['25%', '40%', '15%', '20%'];

    const [players, setPlayers] = useState([])
    useEffect(() => {
        axios.get(API_BASE_URL + "players/eligible_for_captain").then(res => {
            if (res.data.status == 1) {
                setPlayers(res.data.response.players);
            } else toast.error(res.data.message)
        }).catch(err => console.log(err))
    }, [])

    const assignCaptancy = (user_id) => {
        axios.get(API_BASE_URL + "players/promote_as_captain/" + house_data.house_id + "/" + user_id).then(res => {
            if (res.data.status == 1) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            handler();
        }).catch(err => console.log(err))
    }

    return (
        <Dialog open={open} handler={handler} animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
        }}>
            <DialogHeader className='flex justify-between items-center'>
                <Typography variant='h4'>Make a captain for <span style={{ color: house_data.background }}>{house_data.house_name}</span></Typography>
                <i className='fas fa-xmark pointer text-sm' onClick={handler}></i>
            </DialogHeader>
            <DialogBody>
                <table className='w-full table-auto text-left min-w-max'>
                    <thead className='table' style={{ width: "calc(100% - 16px)" }}>
                        <tr className='w-full'>
                            {TABLE_HEAD.map((head, index) => {
                                return (
                                    <th key={index} className="p-3 border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-blue-gray-900 opacity-70" width={COLUMN_WIDTH[index]}>
                                        {head}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className='overflow-y-scroll h-80 block w-full'>
                        {
                            players.map((player, index) => {
                                return (
                                    <tr key={index} className='w-full table'>
                                        <td width={COLUMN_WIDTH[0]} className='p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900'>{player.name}</td>
                                        <td width={COLUMN_WIDTH[1]} className='p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900'>{player.email}</td>
                                        <td width={COLUMN_WIDTH[2]} className='p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900'>{player.contact}</td>
                                        <td width={COLUMN_WIDTH[3]} className='p-3 border-b border-blue-gray-50 text-sm text-blue-gray-900'>
                                            <Button variant='outlined' className='me-1' size='sm' color='green' onClick={() => assignCaptancy(player.user_id)}><i className='fas fa-arrow-up'></i></Button>
                                            <Button variant='outlined' size='sm' color='blue' ><i className='fa-solid fa-eye'></i></Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </DialogBody>
            <DialogFooter className='gap-2'>
                <Button onClick={handler} variant='text' >Cancel</Button>
                <Button color='green' className='bg-rose-800'>Submit</Button>
            </DialogFooter>
        </Dialog>
    )
}

export default MakeCaptainDiaglog