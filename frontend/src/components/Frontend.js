import Header from './frontend/Header';
import Home from './frontend/Home';
import About from './frontend/About';
import Events from './frontend/Events';
import Footer from './frontend/Footer';
import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../constants/constant';
import axios from 'axios';

const Frontend = () => {
    let [data, setData] = useState({})
    useEffect(() => {
        axios({
            url: API_BASE_URL + "site_settings",
            method: "GET"
        }).then((res) => {
            if (res.data.status) {
                data = res.data.response;
                setData(data);
            }
        }).catch(err => console.log(err));

        axios.get(API_BASE_URL + "houses").then(res => {
            if (res.data.status) {
                setData({ ...data, ...res.data.response });
            }
        }).catch(err => {
            console.log(err)
        })
    }, []);
    return (
        <>
            <Header />
            <Home className='' data={data} />
            <div className='mx-auto px-10 py-4 my-4 text-lg'>
                <Events />
                <About data={data} />
            </div> 
            <Footer data={data} />
        </>
    )
}

export default Frontend