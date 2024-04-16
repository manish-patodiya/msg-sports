import { Navbar, Button, Typography } from '@material-tailwind/react'
import { Link as ScrollerLink, animateScroll as scroll } from "react-scroll";
import { Link as Link } from 'react-router-dom';
import React from 'react'

const Header = () => {
    let handleClick = () => {
        console.log("handle navigation")
    }
    return (
        <Navbar className='text-black flex justify-between items-center fixed top-0 left-0 right-0 bg-white bg-opacity-100 container mx-auto rounded-none z-50' >
            <Typography variant='h3' className='flex text-gray-600'><span className='font-serif text-rose-900 font-bold'>.</span>msg-<span className='text-rose-900'> Sports</span ></Typography>
            <ul className='flex'>
                <li className='font-sans text-lg pointer'><ScrollerLink to='home' className='px-4 py-2' activeClass='border-b-2 border-red-800' spy={true} smooth={true} offset={-80} duration={500}>Home</ScrollerLink></li>

                <li className='font-sans text-lg  pointer'><ScrollerLink to='events' className='px-4 py-2' activeClass='border-b-2 border-red-800' spy={true} smooth={true} offset={-80} duration={500}>Events</ScrollerLink></li>


                <li className='font-sans text-lg  pointer'><ScrollerLink to='about' className='px-4 py-2' activeClass='border-b-2 border-red-800' spy={true} smooth={true} offset={-80} duration={500}>About</ScrollerLink></li>

                <li className='font-sans text-lg  pointer'><ScrollerLink to='contact' className='px-4 py-2' activeClass='border-b-2 border-red-800' spy={true} smooth={true} offset={-80} duration={500}>Contact</ScrollerLink></li>

            </ul>
            <div>
                <Link to="/admin">
                    <Button className='bg-rose-800 text-white animate-bounce hover:animate-none duration-300' onClick={handleClick} >Login</Button>
                </Link>
            </div>
        </Navbar>
    )
}

export default Header