import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Header from '../Header/Header';
import bannerImg from '../../../assets/images/banners.svg';
import bannerLeft from '../../../assets/images/bannerLeft.svg';
import bannerRight from '../../../assets/images/bannerRight.svg';

const TopBanner = () => {
    return (
        <Box
            sx={{
                background: `url(${bannerImg}), #404eed`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Header />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '520px', }}>
                <Box sx={{ maxWidth: '780px', textAlign: 'center' }}>
                    <Box sx={{ color: '#ffffff' }}>
                        <Typography sx={{ fontWeight: 800 }} variant="h2">IMAGINE A PLACE...</Typography>
                        <Typography sx={{ mt: '40px', display: 'block', fontSize: '18px', fontWeight: 200, lineHeight: 1.8, }} variant="p">...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</Typography>
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

                            '&:hover': {
                                background: '#23272a',
                                boxShadow: '1px 1px 1px #23272a'
                            }

                        }}>Open Discord in your browser</Button>
                    </Box>
                </Box>
            </Box>

            {/* background image  */}
            <Typography component='img' src={bannerLeft}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: {
                        lg: '-17%',
                        md: '-40%'
                    }
                }}
            />
            <Typography component='img' src={bannerRight}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: '-14%'
                }}
            />

        </Box>
    );
};

export default TopBanner;