import styled from '@emotion/styled';
import { Avatar, Badge, Grid, ToggleButton, Tooltip } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { groupMemberRemove } from '../../../store/actions/groupActions';
import { AUTH_ERROR, AUTH_MESSAGE } from '../../../store/type/authType';
import { SINGLE_PROFILE_FAILED, SINGLE_PROFILE_SUCCESS } from '../../../store/type/profileType';
import SingleProfile from '../../ChatProfile/Profile/SingleProfile';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: -0.9,
            left: -0.7,
            width: '95%',
            height: '95%',
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
            transform: 'scale(2.3)',
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const { selectedChat, auth, theme } = useSelector(state => state)
    const handleRemoveMember = (member) => {
        dispatch(groupMemberRemove(selectedChat?.chat?._id, member?._id, auth?.user?.token))
    }
    if (auth?.message) {
        toast.success(`${auth?.message}`, {
            position: "bottom-right",
            theme: theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({
            type: AUTH_MESSAGE
        })
    }
    if (auth?.error) {
        Object.values(auth?.error)?.forEach((err) => {
            toast.error(`${err}`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({
                type: AUTH_ERROR
            })
        })
    }
    const handleCurrentProfile = (id) => {
        if (id) {
            fetch(`http://localhost:5000/api/auth/single/profile/get/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${auth?.user?.token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        dispatch({
                            type: SINGLE_PROFILE_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                        handleOpen()
                    }
                    if (data?.error) {
                        dispatch({
                            type: SINGLE_PROFILE_FAILED,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
    }
    return (
        <>
            {memberInfo?.length !== 0 && memberInfo?.map((member, index) => (
                <Grid container spacing={2} key={index} alignItems="center" sx={{ padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #dddddd59' }} onClick={() => handleCurrentProfile(member?._id)}>
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
                        <ToggleButton value="check" onClick={() => handleRemoveMember(member)} style={{ marginLeft: '10px', marginBottom: '0px!important', textTransform: 'capitalize', padding: '0px' }}
                            selected={selected}
                            onChange={() => {
                                setSelected(false);
                            }}>
                            <span style={{ fontSize: '10px', }}>Member Leave</span>
                        </ToggleButton>
                    </Grid>
                </Grid>
            ))}
            <SingleProfile caneclBtn="caneclBtn"handleClose={handleClose} handleOpen={handleOpen} open={open} />
        </>
    )
}

export default ProfileGroupList