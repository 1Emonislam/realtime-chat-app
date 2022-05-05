import { Popover, ToggleButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { RiNotification3Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, getNotificationSeenList, getNotificationUnSeenList } from '../../store/actions/messageNotificationAction';
import MsgNotify from './MsgNotify';
export default function MessageNotificationBadge({ handleSingleChat }) {
  const { notification, auth } = useSelector(state => state)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [value, setValue] = React.useState('one');
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(notification)
  return (
    <Badge badgeContent={notification?.myunread} color="primary" style={{ marginTop: '10px' }}>
      <ToggleButton value="nine">
        <RiNotification3Fill fontSize={30} color="action" onClick={handleClick} />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <div>
            {auth?.user?.token && <Tabs
              value={value}
              onChange={handleChange}
              textColor="secondary"
              centered
            >
              <Tab onClick={() => {
                dispatch(getNotification(auth?.user?.token))
              }} style={{ textTransform: 'none', margin: 'none', padding: 'none' }} value="one" label="All" />
              <Tab onClick={() => {
                dispatch(getNotificationUnSeenList(auth?.user?.token))
              }} style={{ textTransform: 'none', margin: 'none', padding: 'none' }} value="two" label="Unseen" />
              <Tab onClick={() => {
                dispatch(getNotificationSeenList(auth?.user?.token))
              }} style={{ textTransform: 'none', margin: 'none', padding: 'none' }} value="three" label="Seen" />
            </Tabs>}
            <span sx={{ py: 0, px: 3 }}>
              {
                !notification?.msgNotification?.length && <p style={{ textAlign: 'center', paddingBottom: '20px!important' }}>No New Messages</p>
              }
            </span>
            {
              notification?.msgNotification?.length !== 0 && notification?.msgNotification?.length && notification?.msgNotification?.map(notify => (
                <MsgNotify handleSingleChat={handleSingleChat} key={notify?._id} notify={notify} auth={auth}> </MsgNotify>
              ))
            }
          </div>
        </Popover>
      </ToggleButton>
    </Badge>
  );
}