import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiQuestionnaireFill } from 'react-icons/ri'
import { AiFillThunderbolt } from 'react-icons/ai'
import { MdFileCopy, MdStickyNote2 } from 'react-icons/md';
export default function MessageFunc2({ idTo }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className='ancor'>
            <BsThreeDotsVertical id={id} onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Copy </span>
                    <span>
                        <MdFileCopy style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>
                {/* <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Delete </span>
                    <span><MdDelete style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>*/}
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>add To Note </span>
                    <span>
                        <MdStickyNote2 style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>

                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Question Repeat </span>
                    <span>
                        <AiFillThunderbolt style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>
                <Typography sx={{ py: 1, px: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Don't Understand</span>
                    <span>
                        <RiQuestionnaireFill style={{ position: 'relative', top: '3px', paddingLeft: '5px' }} />
                    </span>
                </Typography>
            </Popover>
        </div>
    );
}