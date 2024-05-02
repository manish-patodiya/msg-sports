import React, { useEffect, useState } from 'react'
import { Carousel } from "@material-tailwind/react";
import { BASE_URL } from '../../constants/constant';

const Home = ({ data }) => {
    return (
        <section id="home" className='mt-19 mb-14 max-h-[50rem]'>
            <Carousel
                autoplay={true}
                loop={true}
                className='max-h-[50rem]'
            >
                {data.banners ? data.banners.map((banner, index) => {
                    if (banner.show) {
                        return <img
                            key={index}
                            src={BASE_URL + "banners/" + banner.image}
                            alt="image 1"
                            className="w-full object-cover object-top h-[50rem]"
                        />
                    }
                }) : ""}

            </Carousel>
        </section>
    );
}

export default Home