import Header from './frontend/Header';
import Home from './frontend/Home';
import About from './frontend/About';
import Events from './frontend/Events';
import Footer from './frontend/Footer';
import React from 'react'

const Frontend = () => {
    return (
        <>
            <Header />
            <Home />
            <div className='container mx-auto px-4 my-4 text-lg'>
                <About />
                <Events />
            </div>
            <Footer />
        </>
    )
}

export default Frontend