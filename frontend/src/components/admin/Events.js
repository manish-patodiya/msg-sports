import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const Events = () => {
  const TABLE_HEAD = ["Event Name", "Game", "Venue", "Date&Time"];

  const initialEventValues = {
    eventname: "",
    game: "",
    venue: "Cafetaria",
    datetime: "",
  };

  const [eventValues, setEventValues] = useState(initialEventValues);

  const handleAddEventChanges = (e) => {
    console.log(e.target.value);
    setEventValues({ ...eventValues, [e.target.name]: e.target.value });
  };

  const handleAddEvent = (e) => {};

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
            <tbody></tbody>
          </table>
        </div>
        <div className="w-2/5">
          <form
            className="flex flex-col gap-5 w-full"
            onSubmit={handleAddEvent}
          >
            <Input
              name="eventname"
              label="Event Name"
              type="text"
              onChange={handleAddEventChanges}
              value={eventValues.house}
            ></Input>
            <Input
              name="game"
              label="Game"
              onChange={handleAddEventChanges}
              value={eventValues.description}
            ></Input>
            <Input
              name="venue"
              label="Venue"
              type="text"
              onChange={handleAddEventChanges}
              value={eventValues.house}
            ></Input>
            <Input
              name="date"
              label="Date"
              type="datetime-local"
              onChange={handleAddEventChanges}
              value={eventValues.house}
            ></Input>
            <Button className="bg-rose-800" onChange={handleAddEventChanges}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Events;
