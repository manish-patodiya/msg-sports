import { List, ListItem, ListItemPrefix, Typography } from '@material-tailwind/react'
import React from 'react'

export const Sidebar = () => {
    return (
        <div className="h-screen w-full max-w-[16rem] bg-rose-800 fixed top-0 bottom-0 left-0 border-collapse border-x border-gray-600 ">
            <div className="mb-2 p-4 bg-white ">
                <Typography variant="h3" className="flex text-gray-600 ">
                    <span className="font-serif text-rose-900 font-bold">.</span>msg-
                    <span className="text-rose-900"> Sports</span>
                </Typography>
            </div>
            <div className='p-4'>
                <List className="text-white">
                    <ListItem>
                        <ListItemPrefix>
                            <i className="fa-solid fa-table-columns"></i>
                        </ListItemPrefix>
                        <p color="white">Dashboard</p>
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <i className="fa-solid fa-person-military-rifle"></i>
                        </ListItemPrefix>
                        Captains
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <i className="fa-solid fa-person-running"></i>
                        </ListItemPrefix>
                        Players
                    </ListItem>
                    <ListItem>
                        <ListItemPrefix>
                            <i className="fa-solid fa-calendar-day"></i>
                        </ListItemPrefix>
                        Events
                    </ListItem>
                    <hr className="my-10 border-blue-gray-50" />
                    <ListItem>
                        <ListItemPrefix>
                            <i className="fa-solid fa-gear"></i>
                        </ListItemPrefix>
                        Site Settings
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default Sidebar