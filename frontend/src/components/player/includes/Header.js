import React from "react";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../constants/constant";
import { getLoginInfo } from "../../../common/common";

const Header = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("player_auth");
  };

  return (
    <Navbar className="text-black flex justify-between items-center sticky bg-white bg-opacity-100 rounded-none shadow-none">
      <Typography variant="h3" className="flex">
        Player Panel
      </Typography>
      <div>
        <Menu className="">
          <MenuHandler>
            <div className="cursor-pointer">
              <Avatar src={BASE_URL + "profile_photo/" + (getLoginInfo("player", "profile") || "avatar.png")} />
            </div>
          </MenuHandler>
          <MenuList className="text-rose-800">
            <Link to="/player/profile">
              <MenuItem className="flex items-center gap-2">
                <i className="fa-regular fa-user"></i> Account
              </MenuItem>
            </Link>
            <Link to="/player/manage-password">
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
