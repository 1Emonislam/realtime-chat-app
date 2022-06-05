/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar, Button, Modal, ToggleButton } from '@mui/material';
import { Box } from '@mui/system';
import jwt_decoded from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import { inviteLinkDeclined, inviteLinkVerify } from '../store/actions/groupActions';
import { GROUP_INVITE_SAVE, GROUP_PROGRESS_ACCEPTED, GROUP_PROGRESS_DECLINED } from '../store/type/groupType';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    width: '420px',
    boxShadow: 24,
    borderRadius: '10px',
    padding: '25px',
};

export default function GroupInviteAccept() {
    const [chatInfo, setChatInfo] = useState({});
    const { token } = useParams();
    const [error, setError] = useState('')
    const { auth, groupData, theme } = useSelector(state => state)
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!auth?.user?.token) {
            window.localStorage.setItem('inviteToken', JSON.stringify(token))
            window.location.replace('/login')
        } else {
            window?.localStorage?.removeItem('inviteToken')
        }
    }, [auth?.user?.token])
    useEffect(() => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization': `Bearer ${auth?.user?.token}`
                }
            }
            axios.post('https://collaballapp.herokuapp.com/graph/toWeekMessage', config, { shortCode: token, expire: '14d' }).then(({ data }) => {
                dispatch({
                    type: GROUP_INVITE_SAVE,
                    payload: {
                        invite: token,
                    }
                })
                console.log(data)
                const chat = jwt_decoded(data?.data?.token);
                if (chat) {
                    setChatInfo(data?.data)
                }
            })
        }
        catch (error) {
            setError(error?.message)
        }
        dispatch({
            type: GROUP_INVITE_SAVE,
            payload: {
                invite: token,
            }
        })
        setOpen(true)

    }, [dispatch, token])

    const handleClose = () => {
        setOpen(false);
        const status = 'declined'
        dispatch(inviteLinkDeclined(chatInfo?.chat?._id, auth.user?.user?._id, chatInfo?.invitePerson?._id, status, auth?.user?.token))
        window.location.replace('/home')
    };
    const handleAcceptInvite = () => {
        // console.log(chatInfo)
        dispatch(inviteLinkVerify(chatInfo?.chat?._id, auth.user?.user?._id, chatInfo?.invitePerson?._id, auth?.user?.token))
    }
    if (groupData?.message) {
        toast.success(`${groupData?.message}`, {
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
            type: GROUP_PROGRESS_ACCEPTED,
            payload: {
                message: '',
            }
        })
    }
    if (groupData?.error) {
        Object.values(groupData?.error)?.forEach((err) => {
            // console.log(err)
            toast.error(`${err || error}`, {
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
                type: GROUP_PROGRESS_DECLINED,
                payload: {
                    error: [],
                }
            })
        })
    }
    return (
        <>
            <Modal
                style={{ overflowY: 'scroll' }}
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box style={style}>
                    <Avatar variant="inherit" alt={chatInfo?.chat?.chatName} src={chatInfo?.chat?.img} />
                    <ToggleButton value="one" style={{ border: 'none', textTransform: 'none', fontSize: '18px' }}>
                        Members {chatInfo?.chat?.members?.length}
                    </ToggleButton>
                    <ToggleButton id="child-modal-title" value="two" style={{ border: 'none', textTransform: 'none', fontSize: '30px' }}>
                        Invitation Accepted
                    </ToggleButton>
                    <br />
                    <ToggleButton value="two" style={{ border: 'none', textTransform: 'none' }}>
                        Invited  <i style={{ fontSize: '18px', fontWeight: '600', margin: '0 5px' }}> {chatInfo?.invitePerson?.firstName + ' ' + chatInfo?.invitePerson?.lastName}</i> group join  <i style={{ fontSize: '18px', fontWeight: '600', margin: '0 5px' }}> {chatInfo?.chat?.chatName}</i>
                    </ToggleButton>
                    <br />
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAcceptInvite} style={{ marginLeft: '20px' }}>Accepted</Button>
                </Box>

            </Modal>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}
