import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Fandom = () => {
    return (
        <Box sx={{ py: 12 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{textAlign: 'center'}} >
                            <Typography sx={{ width: '80%', height: '450px', borderRadius: '10px' }} component='img' src='https://img.freepik.com/free-vector/computer-social-media-icons_24877-74707.jpg' />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: { md: '48px', xs: '27px' }, fontWeight: 'bold', pb: 4 }}>From few to a fandom</Typography>
                            <Typography sx={{ fontSize: { md: '20px', xs: '18px' }, fontWeight: 300 }} variant='p'>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Fandom;