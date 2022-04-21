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


export default function PeopleOnline() {
    const [selected, setSelected] = React.useState(false);
    return (
        <Grid container spacing={2} alignItems="center"style={{cursor:'pointer'}}>
            {/* online people start */}
            <Grid item xs={3}>
                <Stack>
                    <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar variant="inherit" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </StyledBadge>

                </Stack>
            </Grid>
            <Grid item xs={9}>
                <ToggleButton value="check"
                    selected={selected}
                    style={{ border: 'none',textTransform:'capitalize',position:'relative',left:'-10px' }}
                    onChange={() => {
                        setSelected(false);
                    }}>

                 Emon Islam
                </ToggleButton>
            </Grid>
            {/* online end */}
        </Grid>
    );
}
