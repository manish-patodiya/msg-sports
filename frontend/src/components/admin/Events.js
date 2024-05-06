import { Button, Input, Typography, Select, Option, Textarea } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { API_BASE_URL } from "../../constants/constant";
import { toast } from "react-toastify";

const Events = () => {
  const TABLE_HEAD = ["Event Name", "Game", "Image", "Venue", "Date&Time", "Actions"];
  const initialValues = {
    event_name: "",
    game_id: "",
    photo: "",
    venue: "",
    date_time: ""
  };
  const [eventValues, setEventValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [preview, setPreview] = useState();
  const [file, setFile] = useState();
  const fileRef = useRef();

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
  }, []);

  const handleEventValues = (e) => {
    e.target ?
      setEventValues({ ...eventValues, [e.target.name]: e.target.value }) :
      setEventValues({ ...eventValues, game_id: e })
  };

  const addEvent = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!file) {
      toast.error("Plase select a image", {
        position: "top-right"
      })
      return;
    }
    axios.post(API_BASE_URL + "events/add", eventValues, {}).
      then((res) => {
        setIsSubmitting(false);
        if (res.data.status == 1) {
          setEventValues(initialValues);
          events.push({ event_name: eventValues.event_name, game_id: eventValues.game_id, photo: eventValues.photo, venue: eventValues.venue, date_time: eventValues.date_time })
          setEvents(events)
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
    const data = { "event_id": id }
    axios.delete(API_BASE_URL + 'events', { data }, {}).
      then(res => {
        setIsSubmitting(false);
        if (res.data.status == 1) {
          toast.success(res.data.message, { position: "top-right" });
          setEvents(events.filter(ele => {
            return ele.id !== id;
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
                    <td width={"20%"} className={classes}>{event.event_name}</td>
                    <td width={"20%"} className={classes}>{event.game_id}</td>
                    <td width={"20%"} className={classes}>{event.photo}</td>
                    <td width={"20%"} className={classes}>
                      <Typography className='leading-snug max-h-16 overflow-hidden text-ellipsis'>
                        {event.venue}
                      </Typography>
                    </td>
                    <td width={"70%"} className={classes}>{event.date_time}</td>
                    <td width={"10%"} className={classes}>
                      <Button color="red" variant="outlined" size="sm" onClick={() => deleteEvent(event.id)}><i className="fas fa-trash"></i></Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-2/5">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={addEvent}
          >
            <div className="h-56 w-full rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-2">
              <div
                className={`flex flex-col items-center justify-center ${preview && "hidden"
                  }`}
              >
                <i className="fa-regular fa-Photos text-4xl"></i>
                <Typography variant="h4">Photo preview</Typography>
              </div>
              <img
                src={preview}
                alt="Image Preview"
                className={`rounded-md object-cover object-center max-w-full max-h-full ${preview || "hidden"
                  }`}
                accept="image/*"
              />
            </div>
            <input
              name="photo"
              type="file"
              ref={fileRef}
              className="mt-1"
              accept="image/*"
              onChange={(e) => {
                showPreview(e);
              }}
              required
            />
            <Input
              name="event_name"
              label="Event Name"
              type="text"
              onChange={handleEventValues}
              value={eventValues.event_name}
              required
            ></Input>
            <div>
              <Select
                name="game_id"
                label="Game"
                onChange={handleEventValues}
                value={eventValues.game_id}
                required
              >
                <Option value="1">Cricket</Option>
                <Option value="2">Football</Option>
                <Option value="3">Volleyball</Option>
                <Option value="4">Badminton</Option>
                <Option value="5">Table Tennis</Option>
                <Option value="6">Fooseball</Option>
                <Option value="7">Carrom</Option>
                <Option value="8">Chess</Option>
              </Select>
            </div>
            <Textarea
              name="venue"
              label="Venue"
              onChange={handleEventValues}
              value={eventValues.venue}
              required
            ></Textarea>
            <Input
              name="date_time"
              label="Date"
              type="datetime-local"
              onChange={handleEventValues}
              value={eventValues.date_time}
              required
            ></Input>
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
