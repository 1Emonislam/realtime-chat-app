import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Header from '../Header/Header';
import bannerImg from '../../../assets/images/banners.png';

const TopBanner = () => {
    return (
        <Box
            sx={{
                background: `linear-gradient( rgb(19 39 255 / 78%) 100%, rgb(31 31 216 / 86%)100%),url(${bannerImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Header />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '570px', }}>
                <Box sx={{ maxWidth: '780px', textAlign: 'center' }}>
                    <Box sx={{ color: '#ffffff' }}>
                        <Typography sx={{ fontSize: {lg: '60px', sm: '48px', xs: '30px'}, fontWeight: 800 }} variant="h2">IMAGINE A PLACE...</Typography>
                        <Typography sx={{ mt: {md: '40px', xs: '20px'}, display: 'block', fontSize: {md: '18px', xs: '16px'}, fontWeight: 200, lineHeight: 1.8, }} variant="p">...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</Typography>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Button sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            background: '#fff',
                            textTransform: 'capitalize',
                            color: 'black',
                            borderRadius: '40px',
                            padding: '16px 32px !important',
                            mr: 2,
                            mt: '15px',

                            '&:hover': {
                                color: 'blue',
                                background: '#fff',
                                boxShadow: '1px 1px 1px #fff'
                            }

                        }}> <Typography sx={{ mr: 1 }}><i className="fa-solid fa-circle-arrow-down"></i> </Typography> Download for Windows</Button>
                        <Button sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            background: '#23272a',
                            textTransform: 'capitalize',
                            color: '#fff',
                            borderRadius: '40px',
                            padding: '16px 32px !important',
                            mt: '15px',

                            '&:hover': {
                                background: '#23272a',
                                boxShadow: '1px 1px 1px #23272a'
                            }

                        }}>Open Discord in your browser</Button>
                    </Box>
                </Box>
            </Box>

        </Box>
    );
};

export default TopBanner;