import { Button, Input, Typography, Select, Option, Textarea, Avatar } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL, BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";

const Events = () => {
  const TABLE_HEAD = ["Event info", "Venue / Timing", "Actions"];
  const initialValues = { event_name: "", game_id: "", venue: "", date_time: "" };
  const [eventValues, setEventValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const [games, setGames] = useState([]);


  useEffect(() => {
    axios.get(API_BASE_URL + "events").
      then(res => {
        if (res.data.status) {
          setEvents(res.data.response.events);
        } else {
          toast.error(res.data.message)
        }
      }).catch(err => {
        console.log(err)
      })
    axios.get(API_BASE_URL + "games").then(res => {
      if (res.data.status == 1) {
        setGames(res.data.response.games);
      }
    }).catch(err => console.log(err))
  }, []);

  const handleEventValues = (e) => {
    e.target ? setEventValues({ ...eventValues, [e.target.name]: e.target.value }) : setEventValues({ ...eventValues, game_id: e })
  };

  const resetStates = () => {
    setPreview("");
    setEventValues(initialValues);
    setFile("");
  }

  const addEvent = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Plase select a image");
      return;
    }

    const formData = new FormData()
    formData.append('event_image', file);
    formData.append('event_name', eventValues.event_name);
    formData.append('venue', eventValues.venue);
    formData.append('game_id', eventValues.game_id);
    formData.append('date_time', eventValues.date_time);

    setIsSubmitting(true);
    axios.post(API_BASE_URL + "events/add", formData, {}).then((res) => {
      setIsSubmitting(false);
      if (res.data.status == 1) {
        e.target.reset();
        let game_name;
        games.map(game => {
          if (game.game_id == eventValues.game_id) {
            game_name = game.game_name;
          }
        })

        events.push({ ...eventValues, event_id: res.data.response.result.insertId, game_name: game_name, photo: res.data.response.image })
        setEvents(events)
        resetStates();
        toast.success(res.data.message, { position: "top-right" });
      } else {
        toast.error(res.data.message, { position: "top-right" });
      }
    }).catch(err => {
      console.log(err)
      setIsSubmitting(false);
    })
  };

  const deleteEvent = (id) => {
    const con = window.confirm("Are you sure?");
    if (!con) return;
    setIsSubmitting(true);
    axios.delete(API_BASE_URL + 'events/' + id).
      then(res => {
        setIsSubmitting(false);
        if (res.data.status == 1) {
          toast.success(res.data.message, { position: "top-right" });
          setEvents(events.filter(ele => {
            return ele.event_id !== id;
          }))
        } else {
          toast.error(res.data.message, { position: "top-right" });
        }
      }).catch(err => {
        console.log(err);
        setIsSubmitting(false);
      })
  }

  const showPreview = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setPreview("");
      setFile("");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h4">Events</Typography>
      <div className="flex gap-3">
        <div className="w-3/5 h-full border">
          <table className="table-auto w-full text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, key) => (
                  <th
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    key={key}
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                const isLast = index == events.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index}>
                    <td width={"40%"} className={classes}>
                      <div className="flex gap-2">
                        <Avatar variant="square" src={BASE_URL + "events/" + event.photo} alt="" />
                        {/* <Typography>{event.photo}</Typography> */}
                        <div>
                          <Typography variant="small">{event.event_name}</Typography>
                          <Typography variant="small" color="gray">{event.game_name}</Typography>
                        </div>
                      </div>
                    </td>
                    <td width={"50%"} className={classes}>
                      <Typography variant="small">{event.venue}</Typography>

                      <Typography variant="small">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(event.date_time))}</Typography>
                    </td>
                    <td width={"10%"} className={classes}>
                      <Button color="red" variant="outlined" size="sm" onClick={() => deleteEvent(event.event_id)}><i className="fas fa-trash"></i></Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-2/5">
          <form className="flex flex-col gap-5 w-full" onSubmit={addEvent}>
            <div className="h-56 w-full rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-2">
              <div className={`flex flex-col items-center justify-center ${preview && "hidden"}`}>
                <i className="fa-regular fa-Photos text-4xl"></i>
                <Typography variant="h4">Photo preview</Typography>
              </div>
              <img src={preview} alt="Image Preview" className={`rounded-md object-cover object-center max-w-full max-h-full ${preview || "hidden"}`} accept="image/*" />
            </div>
            <input name="photo" type="file" className="mt-1" accept="image/*" onChange={(e) => { showPreview(e); }} />
            <Input name="event_name" label="Event Name" type="text" onChange={handleEventValues} value={eventValues.event_name} required />
            <div>
              <Select name="game_id" label="Game" onChange={handleEventValues}>
                {games.map((game, index) => {
                  return <Option key={index} value={`${game.game_id}`}>{game.game_name}</Option>
                })}
              </Select>
            </div>
            <Textarea name="venue" label="Venue" onChange={handleEventValues} value={eventValues.venue} required />
            <Input name="date_time" label="Date" type="datetime-local" onChange={handleEventValues} value={eventValues.date_time} required />
            <Button type="submit" disabled={isSubmitting} className="bg-rose-800" >
              {isSubmitting ? <i className="fas fa-spinner animate-spin"></i> : "Save"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Events;
