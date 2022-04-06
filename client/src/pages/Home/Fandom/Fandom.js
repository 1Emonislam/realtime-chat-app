import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import coach from '../../../assets/images/coach.svg';

const Fandom = () => {
    return (
        <Box sx={{ py: 12 }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={7}>
                        <Box >
                            <Typography sx={{ width: '100%' }} component='img' src={coach} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: '48px', fontWeight: 'bold', pb: 4 }}>From few to a fandom</Typography>
                            <Typography sx={{ fontSize: '20px', fontWeight: 300 }} variant='p'>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Fandom;