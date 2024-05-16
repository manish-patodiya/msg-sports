import { Avatar, Chip, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants/constant";
import { getLoginInfo, removeLoginInfo } from "../../../common/common";

const Header = () => {
  const handleLogout = () => {
    removeLoginInfo("captain");
  };

  return (
    <Navbar className="text-black flex justify-between items-center sticky top-0 bg-white bg-opacity-100
    z-10 rounded-none shadow-none">
      <Typography variant="h4" className="flex items-center gap-5">
        Captain Panel
        <div style={{ background: getLoginInfo("captain", "house_name") && getLoginInfo("captain", "background"), color: getLoginInfo("captain", "background") && "white" }} className="flex gap-1 items-center text-sm p-1 rounded-md">
          <i className="fa fa-home"></i>
          {getLoginInfo("captain", "house_name")}
        </div>
      </Typography>
      <div className="flex items-center gap-2">
        <Typography variant="h6">
          <span>{getLoginInfo("captain", "name")}</span>
        </Typography>
        <Menu className="">
          <MenuHandler>
            <div className="cursor-pointer">
              <Avatar src={BASE_URL + "profile_photo/" + (getLoginInfo("captain", "profile") || "avatar.png")} />
            </div>
          </MenuHandler>
          <MenuList className="text-rose-800">
            <Link to="/captain/profile">
              <MenuItem className="flex items-center gap-2">
                <i className="fa-regular fa-user"></i> Account
              </MenuItem>
            </Link>
            <Link to="/captain/manage-password">
              <MenuItem className="flex items-center gap-2">
                <i className="fa-solid fa-key "></i> Manage Password
              </MenuItem>
            </Link>
            <Link onClick={handleLogout} className="border-none">
              <MenuItem className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
};

export default Header;
