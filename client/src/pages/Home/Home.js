import React from 'react';
import Fandom from './Fandom/Fandom';
import InviteOnly from './InviteOnly/InviteOnly';
import ReliableTouch from './ReliableTouch/ReliableTouch';
import TopBanner from './TopBanner/TopBanner';
import WhereHanging from './WhereHanging/WhereHanging';

const Home = () => {
    return (
        <div>
            <TopBanner />
            <InviteOnly />
            <WhereHanging />
            <Fandom />
            <ReliableTouch />
        </div>
    );
};

export default Home;