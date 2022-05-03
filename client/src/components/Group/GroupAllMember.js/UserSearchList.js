/* eslint-disable no-unused-expressions */
import Cancel from '@mui/icons-material/Cancel';
import { Grid, ToggleButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from 'react';

export default function UserSearchList({ setPage, userInfo, handlePageChange, count, page }) {
  const [selected, setSelected] = React.useState([]);
  const handleSelectedUser = (user) => () => {
    const find = selected.find(checkUser => checkUser?._id === user?._id);
    if (!find) {
      setSelected([...selected, user])
    } else {
      return;
    }
  };
  // console.log(userInfo)
  const handleGroupInviteRemove = (rm) => () => {
    const filter = selected?.filter(user => user?._id !== rm?._id);
    setSelected(filter)
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
            {selected?.length !== 0 &&
              selected?.map((user, index) => (
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
            {selected?.length !== 0 && <ToggleButton style={{ textAlign: 'right', marginLeft: '30px' }} value="one" primary='contained'>
              People Invite
            </ToggleButton>}
          </List>
        </>
      </Grid>
    </Grid>
  );
}