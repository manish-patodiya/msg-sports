import React from 'react'
import { Carousel } from "@material-tailwind/react";

const Home = () => {
    return (
        <section id="home" className='mt-19 mb-14'>
            <Carousel
                autoplay={true}
                loop={true}
            >
                <img
                    src="https://images.pexels.com/photos/1080882/pexels-photo-1080882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <img
                    src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="image 2"
                    className="h-full w-full object-cover"
                />

                <img
                    src="https://images.pexels.com/photos/10469894/pexels-photo-10469894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="image 3"
                    className="h-full w-full object-cover"
                />
            </Carousel>
        </section>
    );
}

export default Home