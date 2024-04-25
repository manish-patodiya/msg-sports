import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import React, { useState } from 'react'
import Carousal from './Carousal';
import About from './About';
import GeneralSettings from './GeneralSettings';


const SiteSettings = () => {
    const tabs = [
        { label: "General", value: "general", element: <GeneralSettings /> },
        { label: "Home", value: "home", element: <Carousal /> },
        { label: "About", value: "about", element: <About /> }
    ]
    return (
        <Tabs value="general">
            <TabsHeader>
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