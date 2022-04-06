import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
                <Typography sx={{ fontSize: '20px', color: '#ffffff', textTransform: 'uppercase' }}> <i class="fa-brands fa-discord"></i> Discoard</Typography>
                <Button sx={{
                    fontSize: '14px',
                    background: '#fff',
                    textTransform: 'capitalize',
                    color: 'black',
                    borderRadius: '40px',
                    padding: '7px 16px !important',

                    '&:hover': {
                        color: 'blue',
                        background: '#ffffff',
                        boxShadow: '1px 1px 1px #ffffff'
                    }

                }}>Login</Button>
            </Box>
        </Container>
    );
};

export default Header;