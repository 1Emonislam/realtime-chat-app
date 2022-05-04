import styled from '@emotion/styled';
import { Badge, Grid, ToggleButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import * as React from 'react';
const StyledBadgeOffline = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#f00',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            content: '""',
        },
    },
}));
export default function PeopleOffline({ offline }) {
    const [selected, setSelected] = React.useState(false);
    return (
        <>

            {offline?.map((member, index) => (

                <Grid key={index} container spacing={2} alignItems="center" style={{ cursor: 'pointer', paddingBottom: '10px' }}>
                    {/* {console.log(member?.pic)} */}
                    <Grid item xs={3}>
                        <StyledBadgeOffline
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar variant="inherit" alt={member?.username} src={member?.pic} />
                        </StyledBadgeOffline>
                    </Grid>
                    <Grid item xs={9}>
                        <ToggleButton value="check"
                            selected={selected}
                            style={{ border: 'none', textTransform: 'capitalize', position: 'relative', left: '-10px' }}
                            onChange={() => {
                                setSelected(false);
                            }}>

                            {member?.firstName + ' ' + member?.lastName}
                        </ToggleButton>
                    </Grid>
                </Grid>
            ))}
        </>

    );
}
