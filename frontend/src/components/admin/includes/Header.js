import { Avatar, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/constant";
import { getLoginInfo, removeLoginInfo } from "../../../common/common";

const Header = () => {
  const handleLogout = () => {
    removeLoginInfo("admin");
  };

  return (
    <Navbar className="text-black flex justify-between items-center sticky top-0 bg-white bg-opacity-100
    z-10 rounded-none shadow-none">
      <Typography variant="h4" className="flex items-center gap-2">
        Admin Panel
      </Typography>
      <div className="flex items-center gap-2">
        <Typography variant="h6">
          <span>{getLoginInfo("admin", "name")}</span>
        </Typography>
        <Menu className="">
          <MenuHandler>
            <div className="cursor-pointer">
              <Avatar src={BASE_URL + "profile_photo/" + (getLoginInfo("admin", "profile") || "avatar.png")} />
            </div>
          </MenuHandler>
          <MenuList className="text-rose-800">
            <Link to="/admin/profile">
              <MenuItem className="flex items-center gap-2">
                <i className="fa-regular fa-user"></i> Account
              </MenuItem>
            </Link>
            <Link to="/admin/manage-password">
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
