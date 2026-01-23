import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Layout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <ScrollToTop></ScrollToTop>
            <Navbar />
            <main className='flex-1'>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;