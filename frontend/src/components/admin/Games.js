import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const Games = () => {
  const TABLE_HEAD = ["Sport", "Image", "Venue", "Description", "Date", "Time"];

  const initialGameValues = {
    sport: "",
    image: "",
    venue: "Cafetaria",
    description: "",
    date: "",
    time: "",
  };

  const [gameValues, setGameValues] = useState(initialGameValues);
  const [preview, setPreview] = useState();

  const showPreview = (e) => {
    e.target.files.length
      ? setPreview(URL.createObjectURL(e.target.files[0]))
      : setPreview("");
  };

  const handleAddGameChanges = (e) => {
    console.log(e.target.value);
    setGameValues({ ...gameValues, [e.target.name]: e.target.value });
  };

  const handleAddGame = (e) => {};
  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h4">Houses</Typography>
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
          <form className="flex flex-col gap-5 w-full" onSubmit={handleAddGame}>
            <Input
              name="sport"
              label="Sport"
              type="text"
              onChange={handleAddGameChanges}
              value={gameValues.house}
            ></Input>
            <div className="h-36 w-64 rounded-md flex items-center justify-center text-gray-400 bg-gray-100 p-2">
              <div
                className={`flex flex-col items-center justify-center ${
                  preview && "hidden"
                }`}
              >
                <i className="fa-regular fa-images text-4xl"></i>
                <Typography variant="h4">Image preview</Typography>
              </div>
              <img
                src={preview}
                alt="Image Preview"
                className={`rounded-md object-cover object-center max-w-full max-h-full ${
                  preview || "hidden"
                }`}
                accept="image/*"
              />
            </div>
            <input
              name="image"
              type="file"
              className="mt-1"
              value={gameValues.image}
              accept="image/*"
              onChange={(e) => {
                showPreview(e);
                handleAddGameChanges(e);
              }}
            />
            <Input
              name="venue"
              label="Venue"
              type="text"
              onChange={handleAddGameChanges}
              value={gameValues.house}
            ></Input>
            <Textarea
              name="description"
              label="Description"
              onChange={handleAddGameChanges}
              value={gameValues.description}
            ></Textarea>
            <div className="flex flex-row gap-3">
            <Input
              name="date"
              label="Date"
              type="date"
              onChange={handleAddGameChanges}
              value={gameValues.house}
            ></Input>
            <Input
            name="time"
            label="Start-Time"
            type="time"
            onChange={handleAddGameChanges}
            value={gameValues.house}
          ></Input>

            </div>
            <Button className="bg-rose-800" onChange={handleAddGameChanges}>
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Games;
