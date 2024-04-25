import React from "react";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Header = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("auth");
  };

  return (
    <Navbar className="text-black flex justify-between items-center sticky bg-white bg-opacity-100 rounded-none shadow-none">
      <Typography variant="h3" className="flex">
        Player Panel
      </Typography>
      <div>
        <Menu className="">
          <MenuHandler>
            <i className="fa-solid fa-bars cursor-pointer"></i>
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
