import React from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "@material-tailwind/react";

const Players = () => {
  const TABLE_HEAD = [
    "Sl No",
    "Employee Name",
    "Phone No",
    "Email",
    "Status",
    "",
  ];
  //   const TABLE_BODY = [
  //     ["1", "abcd", "9876543210", "abcd@msg-global.com", "Approved"],
  //     ["2", "wxyz", "8765432109", "wxyz@msg-global.com", "Pending"],
  //     ["3", "mnop", "7654321098", "mnop@msg-global.com", "Rejected"],
  //   ];
  return (
    <div>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <h3 className="block font-sans text-2xl antialiased font-bold leading-snug tracking-normal text-rose-800">
            Players
          </h3>
        </div>
        <div className="flex w-full gap-3 shrink-0 md:w-max">
          <div className="w-auto relative h-10">
            <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                ></path>
              </svg>
            </div>
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Search
            </label>
          </div>
          <div>
            <Button className="bg-black">Search</Button>
          </div>
          <div>
            <Button className="bg-rose-800">
              <i className="fa-solid fa-user-plus"></i> Add Player
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6 px-0">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            {TABLE_HEAD.map((head) => {
              return (
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50 text-sm text-blue-gray-900 opacity-70">
                  {head}
                </th>
              );
            })}
          </thead>
          <tbody>hello</tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
