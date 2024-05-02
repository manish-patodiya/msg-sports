import { Card, CardHeader, CardBody, Typography, CardFooter, Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../constants/constant'

const About = ({ data }) => {
    return (
        <div id="about" className='mt-20'>
            <Typography variant='h2' className='text-rose-800 font-sans'>About</Typography>
            <Typography variant="h2" color="blue-gray" className="mb-2">
                {data.about_title ? data.about_title : "msg sports"}
            </Typography>
            <Typography variant="h4" className="mb-2 font-serif font-thin">
                {data.about_description ? data.about_description : "Not Available"}
            </Typography>

            <div className='flex gap-5 mt-10 flex-wrap'>
                {
                    data.houses && data.houses.map((house, i) => {
                        return (
                            <Card className='w-[32%] text-white hover:-translate-y-1 hover:scale-105 duration-300' style={{ backgroundColor: house.background }} key={i}>
                                <CardHeader
                                    floated={false}
                                    shadow={false}
                                    color="transparent"
                                    className="m-0 rounded-none h-56"
                                >
                                    <img
                                        src={BASE_URL + 'houses/' + house.image} className='object-cover'
                                        alt="Houses"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h5" className="mb-2">
                                        {house.house_name}
                                    </Typography>
                                    <Typography>
                                        {house.house_description}
                                    </Typography>
                                </CardBody>
                            </Card>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default About