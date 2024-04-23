import { Navbar, Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar className="text-black flex justify-between items-center sticky top-0 bg-white bg-opacity-100 rounded-none z-50 shadow-none">
            <Typography variant="h3" className="flex">
                Admin
            </Typography>
            <div>
                <Link to="/profile" className="hover:text-gray-700">
                    <i className="fa-solid fa-user"></i> Profile
                </Link>
            </div>
        </Navbar>
    )
}

export default Header