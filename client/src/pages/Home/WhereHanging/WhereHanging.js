import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const WhereHanging = () => {
    return (
        <Box sx={{ py: 12, background: '#f6f6f6' }}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ px: 4, mt: 4 }}>
                            <Typography variant='h2' sx={{ fontSize: { md: '48px', xs: '27px' }, fontWeight: 'bold', pb: 4 }}>Save topics and notes</Typography>
                            <Typography sx={{ fontSize: { md: '20px', xs: '18px' }, fontWeight: 300 }} variant='p'>Read topics and concepts at your own pace and note without worrying about missing out on group chat.</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography sx={{ width: '80%', height: '450px', borderRadius: '10px' }} component='img' src='https://img.freepik.com/free-vector/internet-communication_24877-51941.jpg' />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WhereHanging;