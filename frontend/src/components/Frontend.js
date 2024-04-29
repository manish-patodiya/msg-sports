import Header from './frontend/Header';
import Home from './frontend/Home';
import About from './frontend/About';
import Events from './frontend/Events';
import Footer from './frontend/Footer';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants/constant';
import axios from 'axios';

const Frontend = () => {
    const [generalInfo, setGeneralInfo] = useState({})
    const [homeData, setHomeData] = useState({})
    const [aboutData, setAboutData] = useState({})
    useEffect(() => {
        axios({
            url: API_BASE_URL + "site_settings",
            method: "GET"
        }).then((res) => {
            if (res.data.status) {
                let data = res.data.response;
                setHomeData(data.banners);
                setAboutData({
                    title: data.about_title,
                    description: data.about_description,
                    houses: data.houses
                });
                setGeneralInfo({
                    name: data.name,
                    email: data.email,
                    contact: data.contact,
                    address: data.address,
                    website: data.website,
                    twitter: data.twitter,
                    instagram: data.instagram,
                    facebook: data.facebook
                })
            }
        }).catch(err => console.log(err));
    }, []);

    return (
        <>
            <Header />
            <Home className='' data={homeData} />
            <div className='container mx-auto px-4 my-4 text-lg'>
                <Events />
                <About data={aboutData} />
            </div>
            <Footer data={generalInfo} />
        </>
    )
}

export default Frontend