import { Navbar, Button, Typography } from '@material-tailwind/react'
import logo from '../../public/favicon.png'
import React from 'react'

const Header = () => {
    let handleClick = () => {
        console.log("handle navigation")
    }
    return (
        <Navbar className='text-black flex justify-between items-center fixed top-0 left-0 right-0 bg-white bg-opacity-100 container mx-auto rounded-none z-50' >
            <Typography variant='h3' className='flex text-gray-600'><span className='font-serif text-rose-900 font-bold '>.</span>msg-<span className='text-rose-900'> Sports</span ></Typography>
            <ul className='flex'>
                <li className='me-4 font-sans text-lg'><a href='#home'>Home</a></li>
                <li className='me-4 font-sans text-lg'><a href='#events'>Events</a></li>
                <li className='me-4 font-sans text-lg'><a href='#about'>About</a></li>
            </ul>
            <div>
                <Button className='bg-rose-800 text-white' onClick={handleClick}>Login</Button>
            </div>
        </Navbar>
    )
}

export default Header