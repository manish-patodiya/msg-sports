import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, BASE_URL } from '../../constants/constant'
import { formatDateTime, getLoginInfo, updateLoginInfo } from '../../common/common'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Nominations = () => {

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

  // const registerForTheEvent = (game_id) => {
  //   axios.post(API_BASE_URL + "events/event_registration/" + getLoginInfo("player", "user_id") + "/" + game_id).then(res => {
  //     if (res.data.status == 1) {
  //       const game_data = getLoginInfo("player", "game_data");
  //       game_data && game_data.forEach((game) => {
  //         if (game.game_id == game_id) {
  //           game.status = 0;
  //           return;
  //         }
  //       })
  //       updateLoginInfo("player", "game_data", game_data);
  //       setRender(!render);
  //       toast.success(res.data.message);
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }

  // const checkRegisteration = (game_id) => {
  //   const game_data = getLoginInfo("player", "game_data");
  //   let registered = false;
  //   game_data && game_data.forEach((game) => {
  //     if (game.game_id == game_id && game.status != null) {
  //       registered = true;
  //       return;
  //     }
  //   })

  //   if (registered) {
  //     return <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3' onClick={() => navigate("/player/nominations")}>
  //       <i className='fa fa-circle-check me-1'></i>Already Nominated
  //     </Button>
  //   } else {
  //     return <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3' onClick={() => registerForTheEvent(game_id)}>Nominate</Button>
  //   }
  // }


  if (events.length) {

    return (
      <div className="flex flex-col gap-3">
        <Typography variant="h4" className=" text-rose-800">
          Your Nominations
        </Typography>
        <div className='flex flex-wrap gap-5'>
          {
            events.map((event, i) => {
              return <Card className='w-[48.5%]' key={i}>
                <CardBody className={`flex gap-8 ${i % 2 != 0 || 'flex-row-reverse '}`}>
                  <div className='flex flex-col gap-3'>
                    <img
                      src={BASE_URL + "events/" + event.photo}
                      alt={`Image ${i + 1}`}
                      className="max-h-[200px] object-cover rounded-xl"
                    />
                    <Typography variant='h4' className='text-rose-800'>{event.event_name}</Typography>
                    <div>
                      <Typography variant='h5' className=' text-gray-600'>{event.game_name}</Typography>

                    </div>
                    <div className=''>
                      <Typography variant="small" className="mb-1 font-thin">
                        <span className='text-rose-800'>Date&Time: </span> {formatDateTime(event.date_time)}
                      </Typography>
                      <Typography variant="small" className="mb-2 font-thin ">
                        <span className='text-rose-800'>Venue: </span> {event.venue}
                      </Typography>
                    </div>
                    <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3'>
                      <i className='fa fa-circle-check me-1'></i>Nominated
                    </Button>
                  </div>
                </CardBody>
              </Card>
            })
          }
        </div>
      </div>
    );
  }
};

export default Nominations;
