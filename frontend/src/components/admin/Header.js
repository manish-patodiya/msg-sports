import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const handleLogout = () => {
    sessionStorage.removeItem("auth");
  }

  return (
    <Navbar className="text-black flex justify-between items-center sticky top-0 bg-white bg-opacity-100 rounded-none z-50 shadow-none">
      <Typography variant="h3" className="flex">
        Admin
      </Typography>
      <div>
        <Menu className="">
          <MenuHandler>
            <i className="fa-solid fa-bars cursor-pointer"></i>
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
