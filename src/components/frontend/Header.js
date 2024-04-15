import { Navbar, Button } from '@material-tailwind/react'
import logo from '../../public/logo.jpg'
import React from 'react'

const Header = () => {
    let handleClick = () => {
        console.log("handle navigation")
    }
    return (
        <Navbar className='text-black flex justify-between items-center fixed top-0 left-0 right-0 bg-white bg-opacity-100' style={{ "z-index": "999" }}>
            <div><img src={logo} className='h-10' /></div>
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