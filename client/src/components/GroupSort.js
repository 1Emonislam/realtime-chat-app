import Popover from '@mui/material/Popover';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupChatData } from '../store/actions/groupActions';
import './Chat.css'
export default function GroupSort({ handleSortClick, page, limit, sortAncorEl, setSortAncorEl }) {

    const handleClose = () => {
        setSortAncorEl(null);
    };
    const open = Boolean(sortAncorEl);
    const id = open ? 'simple-popover' : undefined;
    const dispatch = useDispatch()
    const { auth } = useSelector(state => state)
    return (
        <div>
            {auth?.user?.token && <Popover
                id={id}
                open={open}
                anchorEl={sortAncorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ul className='sort-menu'>
                    <li onClick={() => {
                        dispatch(getGroupChatData(auth?.user?.token, 'popular', page, limit))
                    }}>Popular Group </li>

                    <li onClick={() => {
                        dispatch(getGroupChatData(auth?.user?.token, 'latest', page, limit))
                    }}>Latest Group </li>

                    <li onClick={() => {
                        dispatch(getGroupChatData(auth?.user?.token, 'oldChat', page, limit))
                    }}> Old Group </li>
                </ul>
            </Popover>}
        </div>
    );
}