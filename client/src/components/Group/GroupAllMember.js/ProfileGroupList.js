import styled from '@emotion/styled';
import { Avatar, Badge, Grid, ToggleButton, Tooltip } from '@mui/material';
import moment from 'moment'
import React from 'react';
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

function ProfileGroupList({ memberInfo }) {
    const [selected, setSelected] = React.useState(false);
    return (
        <>
            {memberInfo?.length !== 0 && memberInfo?.map((member, index) => (
                <Grid container spacing={2} key={index} alignItems="center" sx={{ padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #dddddd59' }}>
                    <Grid item xs={2}>
                        <Tooltip style={{ cursor: "pointer", display: 'flex', alignItems: 'center' }} component="span" title={member?.firstName + ' ' + member?.lastName}>
                            {member?.online ?
                                <>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar variant="inherit" alt={member?.username} src={member?.pic} />
                                    </StyledBadge>
                                </>
                                :
                                <>
                                    <StyledBadgeOffline
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar variant="inherit" alt={member?.username} src={member?.pic} />
                                    </StyledBadgeOffline>
                                </>
                            }
                        </Tooltip>
                    </Grid>
                    <Grid item xs={10}>
                        <ToggleButton value="check"
                            selected={selected}
                            onChange={() => {
                                setSelected(false);
                            }} style={{ border: 'none', textTransform: 'capitalize', marginBottom: '0px!important' }}>
                            {member.firstName + ' ' + member?.lastName}
                        </ToggleButton>
                        <ToggleButton value="check"
                            selected={selected}
                            onChange={() => {
                                setSelected(false);
                            }}>
                            <i style={{ fontSize: '9px' }}> Joined {moment(member?.createdAt).fromNow()}</i>
                        </ToggleButton>
                    </Grid>
                </Grid>
            ))}
        </>
    )
}

export default ProfileGroupList