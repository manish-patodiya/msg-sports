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
  return (
    <Navbar className="text-black flex justify-between items-center sticky top-0 bg-white bg-opacity-100 rounded-none z-50 shadow-none">
      <Typography variant="h3" className="flex">
        Admin
      </Typography>
      <div>
        <Menu>
          <MenuHandler>
            <i class="fa-solid fa-bars"></i>
          </MenuHandler>
          <MenuList className="text-rose-800">
            <MenuItem className="flex items-center gap-2">
              <Link to="/admin/profile">
                <i class="fa-regular fa-user"></i>
              </Link>
              Account
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Link to="/admin/manage-password">
                <i class="fa-solid fa-key"></i>
              </Link>
              Manage Password
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
              <Link to="/admin/login">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </Link>
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Navbar>
  );
};

export default Header;
