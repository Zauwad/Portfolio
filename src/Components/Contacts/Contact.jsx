import React from 'react';
import { Helmet } from 'react-helmet';

const Contacts = () => {
    return (
        <div className='bg-black p-10 md:p-20 lg:p-32 space-y-10 h-screen'>

            <Helmet>
                <title>Contacts</title>
            </Helmet>

            <h1 className='font-bold text-5xl'>Contact Information</h1>

            <div className='text-xl'>
                <p>Email: ridwanul.azim@g.bracu.ac.bd</p>
                <p>Phone: 01912598849 (WhatsApp here)</p>
            </div>
        </div>
    );
};

export default Contacts;