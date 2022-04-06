import React from 'react';
import Fandom from './Fandom/Fandom';
import InviteOnly from './InviteOnly/InviteOnly';
import TopBanner from './TopBanner/TopBanner';
import WhereHanging from './WhereHanging/WhereHanging';

const Home = () => {
    return (
        <div>
            <TopBanner />
            <InviteOnly />
            <WhereHanging />
            <Fandom />
        </div>
    );
};

export default Home;