import { Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import * as React from 'react';

export default function PeopleOffline() {
    return (
        <Grid container spacing={2} alignItems="center">
            {/* online people start */}
            <Grid item xs={2} md={3}>
                <Stack>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </Grid>
            <Grid item xs={10} md={9}>
                <Typography sx={{ fontSize: '16px' }}>  Emon Islam</Typography>
            </Grid>
            {/* online end */}
            {/* online people start */}
            <Grid item xs={2} md={3}>
                <Stack>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </Grid>
            <Grid item xs={10} md={9}>
                <Typography sx={{ fontSize: '16px' }}>  Emon Islam</Typography>
            </Grid>
            {/* online end */}
            {/* online people start */}
            <Grid item xs={2} md={3}>
                <Stack>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </Grid>
            <Grid item xs={10} md={9}>
                <Typography sx={{ fontSize: '16px' }}>  Emon Islam</Typography>
            </Grid>
            {/* online end */}
            {/* online people start */}
            <Grid item xs={2} md={3}>
                <Stack>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </Grid>
            <Grid item xs={10} md={9}>
                <Typography sx={{ fontSize: '16px' }}>  Emon Islam</Typography>
            </Grid>
            {/* online end */}
            {/* online people start */}
            <Grid item xs={2} md={3}>
                <Stack>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Stack>
            </Grid>
            <Grid item xs={10} md={9}>
                <Typography sx={{ fontSize: '16px' }}>  Emon Islam</Typography>
            </Grid>
            {/* online end */}
        </Grid>
    );
}
