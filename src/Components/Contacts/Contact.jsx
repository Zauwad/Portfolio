import React from 'react';
import { Helmet } from 'react-helmet';

const Contacts = () => {
    return (
        <div className='bg-black p-10 md:p-20 lg:p-40 space-y-10 h-screen'>

            <Helmet>
                <title>Contacts</title>
            </Helmet>

            <h1 className='font-bold text-5xl'>Contact Information</h1>

            <div className='text-xl'>
                <p>Email: redwanulazimzawad@gmail.com</p>
                <p>Phone: +8801339562237</p>
            </div>
        </div>
    );
};

export default Contacts;