import React from 'react';
import InviteOnly from './InviteOnly/InviteOnly';
import TopBanner from './TopBanner/TopBanner';

const Home = () => {
    return (
        <div>
            <TopBanner />
            <InviteOnly />
        </div>
    );
};

export default Home;