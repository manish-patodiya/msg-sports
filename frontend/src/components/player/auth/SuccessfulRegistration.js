import { Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'
const SuccessfulRegistration = () => {
    return (
        <Card className='w-1/2 animation-wiggle'>
            <CardHeader className='flex justify-center items-center flex-col'>
                <i className="fa-regular fa-circle-check text-8xl text-rose-800 m-2"></i>
                <Typography variant='h6' className='text-rose-800 text-5xl mb-2 text-justify'>Thankyou</Typography>
            </CardHeader>
            <CardBody className='flex flex-col items-center justify-center'>
                <Typography variant='h6' color="gray" className='text-center'>
                    You are successfully signed in to <span className='text-rose-800'>MSG Sports</span> website.
                </Typography>
                <Typography variant='h6' color="gray" className='text-center'>Now, wait for admin to review your profile and authenticate you as a <span className='text-rose-800'>MSG Global Solutions' employee.</span> </Typography>
                <Typography variant='h6' color="gray" className='text-center'>You will get a mail from admin regarding this.</Typography>
            </CardBody >
            <CardFooter className='text-rose-800'>
                <Link to="/player" className='flex justify-end items-center'><i className="fa-solid fa-arrow-left-long me-1"></i>Back to the login page</Link>
            </CardFooter>
        </Card >
    )
}

export default SuccessfulRegistration