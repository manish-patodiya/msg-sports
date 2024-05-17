import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [open, setOpen] = React.useState(0);
  const location = useLocation();

  let count = 1;
  const menu_items = [
    { name: "Dashboard", path: "/captain/dashboard", icon: "fa-table-columns" },
    { name: "Nominations", path: "/captain/player-nominations", icon: "fa-person-running" },
    { name: "Your Team", path: "/captain/team", icon: "fa-users" },
  ];

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className="h-screen w-full max-w-[16rem] bg-rose-800 fixed top-0 bottom-0 left-0 border-collapse border-x border-gray-600 overflow-y-auto remove-scrollbar">
      <div className="mb-2 p-4 bg-white sticky top-0">
        <Link to="/">
          <Typography variant="h3" className="flex text-gray-600 ">
            <span className="font-serif text-rose-900 font-bold">.</span>msg-
            <span className="text-rose-900"> Sports</span>
          </Typography>
        </Link>
      </div>
      <div className="p-1 flex flex-col justify-between min-h-[80vh] z-0">
        <List className="text-white">
          {menu_items.map((menu, key) => {
            if (!menu.submenu) {
              return (
                <Link to={menu.path} key={key}>
                  <ListItem
                    className={
                      menu.path == location.pathname
                        ? "bg-blue-gray-50 text-blue-gray-900 bg-opacity-80"
                        : ""
                    }
                  >
                    <ListItemPrefix>
                      <i className={`fa-solid ${menu.icon} w-4`}></i>
                    </ListItemPrefix>
                    <p color="white">{menu.name}</p>
                  </ListItem>
                </Link>
              );
            } else {
              return (
                <Accordion
                  key={key}
                  className="text-white"
                  open={open === count}
                  icon={
                    <i
                      className={`fa-solid fa-chevron-down w-4 transition-transform text-sm  ${open === count ? "rotate-180" : ""
                        }`}
                    ></i>
                  }
                >
                  <ListItem className="p-0" selected={open === count}>
                    <AccordionHeader
                      onClick={() => handleOpen(count++)}
                      className="border-b-0 p-3 text-white"
                    >
                      <ListItemPrefix>
                        <i
                          className={`fa-solid ${menu.icon} text-base w-4`}
                        ></i>
                      </ListItemPrefix>
                      <Typography className="mr-auto font-normal py-0">
                        {menu.name}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1 text-white">
                    <List className="p-0 text-white">
                      {menu.submenu.map((sm, k) => {
                        return (
                          <Link to={sm.path} key={k}>
                            <ListItem>
                              <ListItemPrefix>
                                <i
                                  className={`fa-solid ${sm.icon || "fa-chevron-right"
                                    } w-4`}
                                ></i>
                              </ListItemPrefix>
                              <p color="white">{sm.name}</p>
                            </ListItem>
                          </Link>
                        );
                      })}
                    </List>
                  </AccordionBody>
                </Accordion>
              );
            }
          })}
        </List>

        <div className='flex flex-col gap-2 px-5 p-3'>
          <Link to="/admin" className="ml-1 mb-1 font-sans text-sm text-white underline">
            Admin login
          </Link>
          <Link to="/player" className="ml-1 mb-1 font-sans text-sm text-white underline">
            Player login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
