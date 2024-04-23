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
            <MenuItem className="flex items-center gap-2">
              <Link to="/admin/profile">
                <i className="fa-regular fa-user me-1"></i> Account
              </Link>

            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Link to="/admin/manage-password">
                <i className="fa-solid fa-key me-1"></i> Manage Password
              </Link>
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Link onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket me-1"></i> Log out
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
};

export default Header;
