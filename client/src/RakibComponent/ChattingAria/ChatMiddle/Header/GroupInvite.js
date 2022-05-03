import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, ToggleButton, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSearchList from '../../../../components/Group/GroupAllMember.js/UserSearchList';
import Loading from '../../../../components/Spinner/Loading';
import { allUserSearch } from '../../../../store/actions/allSearchUserAction';
import { deleteAllMessage } from '../../../../store/actions/messageAction';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 'none',
    borderRadius: '10px',
    p: 4,

};

export default function GroupInvite({ groupInviteOpen, setGroupInviteOpen, handleGroupInvite, handleGroupInviteClose, chatId, token }) {
    const dispatch = useDispatch();
    const { auth, allSearch } = useSelector(state => state)
    const [searchTerm, setSearchTerm] = useState('')
    const [page, setPage] = React.useState(1);
    const [count, setCount] = React.useState(0);
    const limit = 2;
    const handlePageChange = (event, value) => {
        setPage(value);
    };
    // console.log(allSearch)
    function handleSearch(e) {
        if (e.target?.value) {
            setSearchTerm(e.target?.value)
        }
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                dispatch(allUserSearch(searchTerm, page,setCount, limit, auth?.user?.token))
            }
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [auth?.user?.token, dispatch, page, searchTerm])
    return (
        <div>
            <Modal
                style={{ overflowY: 'scroll' }}
                open={groupInviteOpen}
                onClose={handleGroupInviteClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ToggleButton value="one" style={{ textTransform: 'none', fontSize: '20px', border: 'none' }}>
                            Invite people and generate invitation links
                        </ToggleButton>
                        <CancelIcon style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleGroupInviteClose} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <ToggleButton value="two" style={{ textTransform: 'none', border: 'none' }}>
                            <TextField onChange={handleSearch} id="standard-basic" fullWidth label="Search People Email Invite" variant="standard" />
                        </ToggleButton>
                        <ToggleButton value="two" style={{ textTransform: 'none', border: 'none' }}>
                            Only Invite link
                        </ToggleButton>

                    </div>
                    {/* {console.log(allSearch?.searchUser)} */}
                    {allSearch?.loading && <Loading />}
                     <UserSearchList handlePageChange={handlePageChange} setPage={setPage} limit={limit} page={page} userInfo={allSearch?.searchUser} count={count} />
                    <Button onClick={() => setGroupInviteOpen(false)}>
                    </Button>
                    {token && chatId ? <Button onClick={() => {
                        dispatch(deleteAllMessage(chatId, token))
                        setGroupInviteOpen(false)
                    }}>

                    </Button>
                        : <Tooltip style={{ cursor: "pointer" }} title="Permission denied" arrow>
                            <Button>
                                Delete
                            </Button>
                        </Tooltip>
                    }
                </Box>
            </Modal>
        </div >
    );
}