import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import bannerImg from '../../../assets/images/banners.png';
import Header from '../Header/Header';

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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '630px', }}>
                <Box sx={{ maxWidth: '810px', textAlign: 'center' }}>
                    <Box sx={{ color: 'white', px: 2 }}>
                        <Typography sx={{ fontSize: { lg: '38px', sm: '28px', xs: '24px' }, fontWeight: 600, lineHeight: 1.3 }} variant="h2">Modern chat support system is a web-based application that facilitates productive meetings between students with and without dyslexia and/or ADHD.</Typography>
                        {/* <Typography sx={{ mt: { md: '40px', xs: '20px' }, display: 'block', fontSize: { md: '18px', xs: '16px' }, fontWeight: 200, lineHeight: 1.8, }} variant="p">Modern chat support system is a web-based application that facilitates productive meetings between students with and without dyslexia and/or ADHD.</Typography> */}
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <Button sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            background: 'transparent',
                            textTransform: 'capitalize',
                            color: 'white',
                            border: '1px solid white',
                            borderRadius: '40px',
                            padding: '16px 32px !important',
                            mr: 2,
                            mt: '15px',

                            '&:hover': {
                                color: '#ddd',
                                background: 'transparent',
                                boxShadow: '1px 1px 1px #ddd'
                            }

                        }}> <Typography sx={{ mr: 1 }}><i className="fa-solid fa-circle-arrow-down"></i> </Typography> Download for Windows</Button>
                        <Button sx={{
                            fontSize: '16px',
                            fontWeight: '500',
                            background: '#23272a',
                            textTransform: 'capitalize',
                            color: 'white',
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