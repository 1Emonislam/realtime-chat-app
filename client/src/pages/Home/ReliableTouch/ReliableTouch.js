import { Button, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import relibleTouch from '../../../assets/images/relibleTouch.svg';
import relibleBg from '../../../assets/images/relibleBg.svg';

const ReliableTouch = () => {
    return (
        <Box sx={{ background: '#f6f6f6', textAlign: 'center', py: 12 }}>
            <Container>
                <Box sx={{ maxWidth: '980px', margin: '0 auto' }}>
                    <Typography sx={{ fontSize: '40px', fontWeight: 800, mb: 4 }} variant="h2">RELIABLE TECH FOR STAYING CLOSE</Typography>
                    <Typography sx={{ fontSize: '20px', fontWeight: 300, lineHeight: 1.7 }} variant="p">Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</Typography>
                </Box>
                <Box>
                    <Typography sx={{ width: '100%' }} component='img' src={relibleTouch} />
                </Box>
                <Box>
                    <Typography sx={{ width: '60%', mt: 3 }} component='img' src={relibleBg} />
                </Box>
                <Box sx={{ mt: 5 }}>
                    <Button sx={{
                        fontSize: '16px',
                        fontWeight: '500',
                        background: '#5865f2',
                        textTransform: 'capitalize',
                        color: '#fff',
                        borderRadius: '40px',
                        padding: '16px 32px !important',
                        mr: 2,

                        '&:hover': {
                            background: '#7c86f7',
                            boxShadow: '1px 1px 1px #7c86f7'
                        }

                    }}> <Typography sx={{ mr: 1 }}><i className="fa-solid fa-circle-arrow-down"></i> </Typography> Download for Windows</Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ReliableTouch;