import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Grid, ToggleButton } from '@mui/material';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


export default function PeopleOnline({ online }) {
    const [selected, setSelected] = React.useState(false);
    return (
        <>
            {online?.length !== 0 && online?.map((online, index) => (
                <Grid key={index} container spacing={2} alignItems="center" style={{ cursor: 'pointer', paddingBottom: '10px' }}>
                    <Grid item xs={3}>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar variant="inherit" alt={online?.username} src={online?.pic} />
                            </StyledBadge>
                    </Grid>
                    <Grid item xs={9}>
                        <ToggleButton value="check"
                            selected={selected}
                            style={{ border: 'none', textTransform: 'capitalize', position: 'relative', left: '-10px' }}
                            onChange={() => {
                                setSelected(false);
                            }}>

                            {online.firstName + ' ' + online?.lastName}
                        </ToggleButton>
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
