import React from 'react';
import Fandom from './Fandom/Fandom';
import Footer from './Footer/Footer';
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
            <Footer />
        </div>
    );
};

export default Home;