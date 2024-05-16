import { Button, Card, CardBody, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, BASE_URL } from '../../constants/constant'
import { formatDateTime, getLoginInfo, updateLoginInfo } from '../../common/common'
import { useNavigate } from 'react-router-dom'
import { checkAuth } from '../../common/common';
import { toast } from 'react-toastify'

const Events = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [render, setRender] = useState(false);
    useEffect(() => {
        axios.get(API_BASE_URL + "events").then(res => {
            if (res.data.status == 1) {
                setEvents(res.data.response.events);
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])

    const registerForTheEvent = (event_id) => {
        axios.post(API_BASE_URL + "events/event_registration/", { user_id: getLoginInfo("player", "user_id"), event_id: event_id }).then(res => {
            if (res.data.status == 1) {
                const player_registrations = getLoginInfo("player", "player_registrations");
                player_registrations.push({ event_id });
                updateLoginInfo("player", "player_registrations", player_registrations);
                setRender(!render);
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const checkRegisteration = (eventID) => {
        const player_registrations = getLoginInfo("player", "player_registrations");
        let registered = false;
        player_registrations && player_registrations.forEach(({ event_id }) => {
            if (eventID == event_id) {
                registered = true;
                return;
            }
        })

        if (registered) {
            return <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3' onClick={() => navigate("/player/nominations")}>
                <i className='fa fa-circle-check me-1'></i>Registered
                <span className='ms-3'>Go to nominations page <i className='fa fa-arrow-right'></i></span>
            </Button>
        } else {
            return <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3' onClick={() => registerForTheEvent(eventID)}>Register</Button>
        }
    }

    if (events.length)
        return (
            <section id='events' className='mb-14'>
                <Typography variant='h2' className='text-rose-800 font-sans'>Games & Events</Typography>
                <div className='flex mt-8 gap-10 flex-col'>
                    {
                        events.map((event, i) => {
                            return <Card className='w-full' key={i}>
                                <CardBody className={`flex gap-8 ${i % 2 != 0 || 'flex-row-reverse'}`}>
                                    <div className='w-1/2'>
                                        <img
                                            src={BASE_URL + "events/" + event.photo}
                                            alt={`Image ${i + 1}`}
                                            className="max-h-[350px] w-full object-cover rounded-xl hover:-translate-y-1 hover:scale-105 duration-300"
                                        />
                                    </div>
                                    <div className='w-1/2 flex flex-col gap-3'>
                                        <Typography variant='h4' className='text-rose-800'>{event.event_name}</Typography>
                                        <div>
                                            <Typography variant='h5' className=' text-gray-600'>{event.game_name}</Typography>
                                            <Typography variant="paragraph" className="mb-2 font-thin">
                                                {event.game_description}
                                            </Typography>
                                        </div>
                                        <div className=''>
                                            <Typography variant="small" className="mb-1 font-thin">
                                                <span className='text-rose-800'>Date&Time: </span> {formatDateTime(event.date_time)}
                                            </Typography>
                                            <Typography variant="small" className="mb-2 font-thin ">
                                                <span className='text-rose-800'>Venue: </span> {event.venue}
                                            </Typography>
                                        </div>
                                        {checkAuth("player") ?
                                            checkRegisteration(event.event_id) :
                                            <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3' onClick={() => navigate("/player")}>Register</Button>
                                        }
                                    </div>

                                </CardBody>
                            </Card>
                        })
                    }

                </div>
            </section>
        )
}

export default Events