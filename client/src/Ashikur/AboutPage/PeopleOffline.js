import styled from '@emotion/styled';
import { Badge, Grid, ToggleButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SingleProfile from '../../components/ChatProfile/Profile/SingleProfile';
import { AUTH_ERROR, AUTH_MESSAGE } from '../../store/type/authType';
import { SINGLE_PROFILE_FAILED, SINGLE_PROFILE_SUCCESS } from '../../store/type/profileType';
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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const {  auth, theme } = useSelector(state => state)
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

            {offline?.map((member, index) => (

                <Grid key={index} container spacing={2} alignItems="center" style={{ cursor: 'pointer', paddingBottom: '10px' }}onClick={() => handleCurrentProfile(member?._id)}>
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
               <SingleProfile caneclBtn="caneclBtn" handleClose={handleClose} handleOpen={handleOpen} open={open} />
        </>

    );
}
