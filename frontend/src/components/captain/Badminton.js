import React from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Rating,
} from "@material-tailwind/react";

const Badminton = () => {
  const TABLE_HEAD = [
    "Sl No",
    "Employee Name",
    "Rating",
    "Status",
  ];

  return (
    <div className="p-4 px-0">
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
        <tbody>
          <tr>
            <td className="p-4 border-b border-blue-gray-50 text-sm text-blue-gray-900">
              1
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 p-1 border rounded-md h-9 border-blue-gray-50">
                  <img
                    src=""
                    alt="profile-pic"
                    className="relative inline-block h-full w-full !rounded-none  object-contain object-center p-1"
                  />
                </div>
                <div className="flex flex-col text-sm antialiased capitalize">
                  abcd
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div>
                <Rating value={3} readonly />
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <Menu>
                <MenuHandler>
                  <i className="fa-solid fa-pen"></i>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="flex items-center gap-2 text-green-900 bg-green-500/20">
                    <i className="fa-solid fa-check"></i> Approve
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2 text-red-900 bg-red-500/20">
                    <i className="fa-solid fa-xmark"></i> Reject
                  </MenuItem>
                </MenuList>
              </Menu>
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-blue-gray-50 text-sm text-blue-gray-900">
              2
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 p-1 border rounded-md h-9 border-blue-gray-50">
                  <img
                    src=""
                    alt="profile-pic"
                    className="relative inline-block h-full w-full !rounded-none  object-contain object-center p-1"
                  />
                </div>
                <div className="flex flex-col text-sm antialiased capitalize">
                  wxyz
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div>
                <Rating value={5} readonly />
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <Menu>
                <MenuHandler>
                  <i className="fa-solid fa-pen"></i>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="flex items-center gap-2 text-green-900 bg-green-500/20">
                    <i className="fa-solid fa-check"></i> Approve
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2 text-red-900 bg-red-500/20">
                    <i className="fa-solid fa-xmark"></i> Reject
                  </MenuItem>
                </MenuList>
              </Menu>
            </td>
          </tr>
          <tr>
            <td className="p-4 border-b border-blue-gray-50 text-sm text-blue-gray-900">
              3
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-12 p-1 border rounded-md h-9 border-blue-gray-50">
                  <img
                    src=""
                    alt="profile-pic"
                    className="relative inline-block h-full w-full !rounded-none  object-contain object-center p-1"
                  />
                </div>
                <div className="flex flex-col text-sm antialiased capitalize">
                  mnop
                </div>
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <div>
                <Rating value={4} readonly />
              </div>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <Menu>
                <MenuHandler>
                  <i className="fa-solid fa-pen"></i>
                </MenuHandler>
                <MenuList>
                  <MenuItem className="flex items-center gap-2 text-green-900 bg-green-500/20">
                    <i className="fa-solid fa-check"></i> Approve
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2 text-red-900 bg-red-500/20">
                    <i className="fa-solid fa-xmark"></i> Reject
                  </MenuItem>
                </MenuList>
              </Menu>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Badminton;
