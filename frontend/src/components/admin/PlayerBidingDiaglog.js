import React, { useEffect, useState } from 'react'
import { Dialog, DialogBody, DialogHeader, DialogFooter, Select, Option, Input, Button } from '@material-tailwind/react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';
import { toast } from 'react-toastify';

const PlayerBidingDiaglog = ({ open, handler, userID }) => {
    const [houses, setHouses] = useState([])
    const [selectBG, setSelectBG] = useState("white");
    const [bidAmt, setBidAmt] = useState(10);
    const [houseID, setHouseID] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(API_BASE_URL + "houses").then(res => {
            if (res.data.status == 1) {
                setHouses(res.data.response.houses);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const assignHouse = (e) => {
        e.preventDefault();
        if (!houseID) {
            setError("Please select a house");
            return;
        }
        if (!bidAmt) {
            setError("Please give a amount");
            return;
        }

        setIsSubmitting(true);
        axios.post(API_BASE_URL + "players/assign_house/" + userID, { house_id: houseID, bid_amt: bidAmt }).then(res => {
            setIsSubmitting(false);
            handler();
            if (res.data.status == 1) {
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            console.log(err)
            setIsSubmitting(false);
        });
    }

    return (
        <Dialog open={open} handler={handler} size='xs'>
            <form onSubmit={assignHouse}>
                <DialogHeader>Name of the player</DialogHeader>
                <DialogBody>
                    <div className='flex gap-5'>
                        <div className='w-full'>
                            <Select label="House" className="text-white" style={{ backgroundColor: selectBG }} onChange={(val) => { setHouseID(val); setError(""); }}>
                                {
                                    houses.map((house, index) => {
                                        if (house.cap_id)
                                            return <Option onClick={() => setSelectBG(house.background)} className="text-white mb-1" style={{ backgroundColor: house.background }} key={index} value={`${house.house_id}`}>{house.house_name}</Option>
                                        return ""
                                    })
                                }
                            </Select>
                        </div>
                        <div className='w-full'>
                            <Input label="Bid Amount" type="number" value={bidAmt} onChange={(e) => { setBidAmt(e.target.value); setError(""); }}></Input>
                        </div>
                    </div>
                    <p className={`text-red-800 rounded-md p-2 mb-3 `}>{error}</p>
                </DialogBody>
                <DialogFooter>
                    <Button variant="text" color="red" onClick={handler} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button type='submit' variant="gradient" disabled={isSubmitting} color="green">
                        {isSubmitting ? <i className='fa fa-spin animate-spin'></i> : <span>Confirm</span>}
                    </Button>
                </DialogFooter>
            </form>
        </Dialog>
    )
}

export default PlayerBidingDiaglog