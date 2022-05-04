/* eslint-disable no-unused-expressions */
import Cancel from '@mui/icons-material/Cancel';
import { Grid, ToggleButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { groupInvite } from '../../../store/actions/groupActions';

export default function UserSearchList({ setPage,emailStore, chatId, auth, handleCopy, setEmailCollection, emailCollection, userInfo, handlePageChange, count, page }) {
  const dispatch = useDispatch()
  const handleSelectedUser = (user) => () => {
    const find = emailCollection?.find(checkUser => checkUser?._id === user?._id);
    if (!find) {
      setEmailCollection([...emailCollection, user])
    } else {
      return;
    }
  };
  // console.log(userInfo)
  const handleGroupInviteRemove = (rm) => () => {
    const filter = emailCollection?.filter(user => user?._id !== rm?._id);
    setEmailCollection(filter)
  }
  return (
    <Grid container spacing={0}>
      <Grid item xs={6}>
        {userInfo?.length !== 0 && <span sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {userInfo?.map((user, index) => (
            <span key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }} onClick={handleSelectedUser(user)}>
              <Avatar
                alt={user.username}
                src={user.pic}
              />
              <ToggleButton value={`${index}`} style={{ margingLeft: '5px', border: 'none', textTransform: 'capitalize' }}>
                {user.firstName + ' ' + user.lastName}
              </ToggleButton>
            </span>
          ))
          }
          <Stack spacing={2}>
            <Pagination count={count} page={page} onChange={handlePageChange} />
          </Stack>
        </span>}
      </Grid>
      <Grid item xs={6}>
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {emailCollection?.length !== 0 && emailCollection?.length &&
              emailCollection?.map((user, index) => (
                <span key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <Avatar
                    alt={user.username}
                    src={user.pic}
                  />
                  <ToggleButton value={`${index}`} style={{ margingLeft: '5px', border: 'none', textTransform: 'capitalize' }}>
                    {user.firstName + ' ' + user.lastName}
                  </ToggleButton>
                  <Cancel style={{ cursor: 'pointer' }} sx={{ color: "#ee00ab" }} onClick={handleGroupInviteRemove(user)} />
                </span>

              ))
            }
            {emailCollection?.length !== 0 && auth?.user?.token && <ToggleButton style={{ textAlign: 'right', marginLeft: '30px' }} value="one" primary='contained' onClick={() => dispatch(groupInvite(chatId, auth?.user?.token, handleCopy, emailStore))}>
              People Invite
            </ToggleButton>}
          </List>
        </>
      </Grid>
    </Grid>
  );
}