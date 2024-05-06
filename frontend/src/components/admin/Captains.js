import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const Captains = () => {
  const TABLE_HEAD = ["Captain Name","Captain Email","Captain Ph", "House", "Action"];

  return (
    <div className="flex flex-col gap-3">
      <Typography variant="h5">Captains</Typography>
      <div className="flex gap-3">
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
    </div>
  );
};

export default Captains;
