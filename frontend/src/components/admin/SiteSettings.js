import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import Carousal from './site_settings/Carousal';
import About from './site_settings/About';
import GeneralSettings from './site_settings/GeneralSettings';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';


const SiteSettings = () => {
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
    }, [])

    const tabs = [
        { label: "General", value: "general", element: <GeneralSettings data={generalInfo} /> },
        { label: "Home", value: "home", element: <Carousal data={homeData} /> },
        { label: "About", value: "about", element: <About data={aboutData} /> }
    ]
    return (
        <Tabs value="general">
            <TabsHeader className='z-0'>
                {tabs.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                        {label}
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody className='pt-4'>
                {tabs.map(({ value, element }) => (
                    <TabPanel key={value} value={value} className='py-0'>
                        {element}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs >
    )


}

export default SiteSettings