import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Navbar,
} from "@material-tailwind/react";
import { Link as Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Card className="h-screen w-full max-w-[16rem] p-4 bg-rose-800 rounded-none">
          <div className="mb-2 p-4">
            <Typography variant="h4" color="white">
              Sidebar
            </Typography>
          </div>
          <div>
            <List className="text-white">
              <ListItem>
                <ListItemPrefix>
                  <i class="fa-solid fa-table-columns"></i>
                </ListItemPrefix>
                <p color="white">Dashboard</p>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <i class="fa-solid fa-person-military-rifle"></i>
                </ListItemPrefix>
                Captains
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <i class="fa-solid fa-person-running"></i>
                </ListItemPrefix>
                Players
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <i class="fa-solid fa-calendar-day"></i>
                </ListItemPrefix>
                Events
              </ListItem>
              <hr className="my-10 border-blue-gray-50" />
              <ListItem>
                <ListItemPrefix>
                  <i class="fa-solid fa-gear"></i>
                </ListItemPrefix>
                Site Settings
              </ListItem>
            </List>
          </div>
        </Card>
      </div>
      <div>
        <Navbar className="text-black flex justify-between items-center fixed top-0 left-64 right-0 bg-white bg-opacity-100 rounded-none z-50 w-auto">
          <Typography variant="h3" className="flex text-gray-600">
            <span className="font-serif text-rose-900 font-bold">.</span>msg-
            <span className="text-rose-900"> Sports</span>
          </Typography>
          <div>
            <Link to="/profile" className="hover:text-gray-700">
              <i class="fa-solid fa-user"></i> Profile
            </Link>
          </div>
        </Navbar>
      </div>
    </div>
  );
};

export default Dashboard;
