import CancelIcon from '@mui/icons-material/Cancel';
import { TextField, ToggleButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import UserSearchList from '../../../../components/Group/GroupAllMember.js/UserSearchList';
import Loading from '../../../../components/Spinner/Loading';
import { allUserSearch } from '../../../../store/actions/allSearchUserAction';
import { groupInvite } from '../../../../store/actions/groupActions';

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

export default function GroupAllMemberSearch({ addMemberOpen, setAddMemberOpen, handleAddMemberOpen, handleAddMemberClose, chatId, token }) {
  const dispatch = useDispatch();
  const { auth, theme, allSearch } = useSelector(state => state)
  const [searchTerm, setSearchTerm] = useState('')
  const [emailCollection, setEmailCollection] = useState([])
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const limit = 10;
  const emailStore = [];
  const userStore = [];
  if (emailCollection?.length) {
    for (let emailSelecte of emailCollection) {
      emailStore.push(emailSelecte?.email)
    }
  }
  if (emailCollection?.length) {
    for (let user of emailCollection) {
      userStore.push(user?._id)
    }
  }
  // console.log(emailStore)
  const handleCopy = (data, copy) => {
    // console.log(data)
    if (copy) {
      if (data?.data) {
        navigator.clipboard.writeText(data?.data)
        toast.success(`Invitation Link Copied`, {
          position: "bottom-right",
          theme: theme?.theme,
          fontWeight: '500',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
    if (data?.message) {
      toast.success(data?.message, {
        position: "bottom-right",
        theme: theme?.theme,
        fontWeight: '500',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if (data?.error?.invite || data?.error?.token) {
      toast.error(data?.error.invite || data?.error?.token, {
        position: "bottom-right",
        theme: theme?.theme,
        fontWeight: '500',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

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
        dispatch(allUserSearch(searchTerm, page, setCount, limit, auth?.user?.token))
      }
    }, 500)
    return () => clearTimeout(delayDebounceFn)
  }, [auth?.user?.token, dispatch, page, searchTerm])


  return (
    <div>
      <Modal
        style={{ overflowY: 'scroll' }}
        open={addMemberOpen}
        onClose={handleAddMemberClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ToggleButton value="one" style={{ textTransform: 'none', fontSize: '20px', border: 'none' }}>
              Add Members Search Username or Email
            </ToggleButton>
            <CancelIcon style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleAddMemberClose} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ToggleButton value="two" style={{ textTransform: 'none', border: 'none' }}>
              <TextField onChange={(e) => handleSearch(e)} id="standard-basic" style={{ fontSize: '14px' }} fullWidth label=" People Search..." variant="standard" />
            </ToggleButton>
            {auth?.user?.token && <ToggleButton value="two" style={{ textTransform: 'none', border: 'none' }} onClick={() => dispatch(groupInvite(chatId, auth?.user?.token, handleCopy, ''))}>
              Add Member Invitation Link
            </ToggleButton>}
          </div>
          {/* {console.log(allSearch?.searchUser)} */}
          {allSearch?.loading && <Loading />}
          <UserSearchList addMember="Add" userStore={userStore} chatId={chatId} auth={auth} handleCopy={handleCopy} emailCollection={emailCollection} setEmailCollection={setEmailCollection} handlePageChange={handlePageChange} setPage={setPage} limit={limit} page={page} userInfo={allSearch?.searchUser} count={count} />
        </Box>
      </Modal>
    </div >
  );
}