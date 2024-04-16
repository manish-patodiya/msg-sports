import { Typography, IconButton } from '@material-tailwind/react'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-rose-800 text-white px-16 py-8 flex'>
            <div className='w-7/12 flex gap-2 flex-col'>
                <div className='flex flex-col gap-2 mb-10 '>
                    <Typography variant='h6' className='font-serif'><i className='fas fa-phone'></i> +91 9999999999</Typography>
                    <Typography variant='h6' className='font-serif'><i className='fas fa-location-dot'></i> msg global solutions, ag Thurgauerstrasse 39, 8050 Zürich/Oerlikon, Switzerland</Typography>
                    <Typography variant='h6' className='font-serif'><i className='fas fa-envelope'></i> msg-sports@msg.com</Typography>
                </div>
                <div className="flex gap-4">
                    <IconButton className="rounded bg-red-600">
                        <i className="fab fa-google text-lg" />
                    </IconButton>
                    <IconButton className="rounded bg-light-blue-500">
                        <i className="fab fa-twitter text-lg" />
                    </IconButton>
                    <IconButton className="rounded bg-pink-400">
                        <i className="fab fa-dribbble text-lg" />
                    </IconButton>
                    <IconButton className="rounded bg-blue-900">
                        <i className="fab fa-facebook text-lg" />
                    </IconButton>
                </div>
            </div>
            <div className='w-1/2 flex justify-end'>
                <img src="https://www.msg-global.com/images/2023/08/11/hi_msg-global_about-us_800x800.webp" alt="" className='w-3/4' />
            </div>
        </div>
    )
}

export default Footer