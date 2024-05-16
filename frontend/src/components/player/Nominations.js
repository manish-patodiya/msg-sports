import { Button, Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, BASE_URL } from '../../constants/constant'
import { formatDateTime, getLoginInfo, updateLoginInfo } from '../../common/common'
import { toast } from 'react-toastify'

const Nominations = () => {

  const [nominations, setNominations] = useState([]);
  const [render, setRender] = useState(false);
  useEffect(() => {
    axios.get(API_BASE_URL + "events/get_user_nominations/" + getLoginInfo("player", "user_id")).then(res => {
      if (res.data.status == 1) {
        setNominations(res.data.response.nominations);
      }
    }).catch(err => {
      console.log(err)
    })
  }, []);

  const withdrawYourNomination = (eventID) => {
    axios.post(API_BASE_URL + "events/withdraw_nomination/" + getLoginInfo("player", "user_id") + "/" + eventID).then(res => {
      if (res.data.status == 1) {
        const player_registrations = getLoginInfo("player", "player_registrations");
        player_registrations && player_registrations.forEach((event_id, index) => {
          if (event_id == eventID) {
            delete player_registrations[index];
            return;
          }
        })

        setNominations(nominations.filter((event) => {
          if (event.event_id != eventID) {
            return event;
          }
        }))

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

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h4" className=" text-rose-800">
        Your Nominations
      </Typography>
      <div className='flex flex-wrap gap-5'>
        {
          nominations.map((event, i) => {
            let classes = "";
            if (event.nomination_status == 0) classes = "text-yellow-900 bg-yellow-500/20"
            else if (event.nomination_status == 1) classes = "text-green-900 bg-green-500/20"
            else classes = "text-red-900 bg-red-500/20";

            return <Card className='w-[48.5%]' key={i}>
              <CardBody className={`flex gap-8 ${i % 2 != 0 || 'flex-row-reverse '}`}>
                <div className='flex flex-col gap-3'>
                  <img
                    src={BASE_URL + "events/" + event.photo}
                    alt={`Image ${i + 1}`}
                    className="max-h-[200px] object-cover rounded-xl"
                  />
                  <div className='flex flex-row gap-2 justify-between'>
                    <Typography variant='h5' className='text-rose-800'>{event.event_name}</Typography>
                    <Typography className={`flex px-2 py-2 font-sans text-xs font-bold uppercase rounded-md ${classes}`}>{event.nomination_status == 0 ? "Pending" : (event.nomination_status == 1 ? "Approved" : "Rejected")}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant='h5' className=' text-gray-600'>{event.game_name}</Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="mb-1 font-thin">
                      <span className='text-rose-800'>Date&Time: </span> {formatDateTime(event.date_time)}
                    </Typography>
                    <Typography variant="small" className="mb-2 font-thin ">
                      <span className='text-rose-800'>Venue: </span> {event.venue}
                    </Typography>
                  </div>
                  <div className='flex items-centre justify-center'>
                    {(event.nomination_status==0) ? <Button size='sm' className='bg-white text-rose-800 border-rose-800 shadow-none hover:shadow-none border mt-3' onClick={() => withdrawYourNomination(event.event_id)}>
                      <i className='fa fa-xmark me-1'></i>Withdraw Nomination
                    </Button> : ""}
                    
                  </div>
                </div>
              </CardBody>
            </Card>
          })
        }
      </div>
    </div>
  );
}

export default Nominations;
