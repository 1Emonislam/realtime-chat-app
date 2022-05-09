import { IconButton, InputBase, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import dreams_sm from '../../../assets/images/dream-sm.png';
import Profile from '../Porfile/Profile';
import Notification from '../Notification/Notification';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

const Header = ({ selected, setSelected }) => {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#ffffff',
            px: 4,
            py: 2,
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {
                    selected && <Typography sx={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Popunies' }} component='h4' > CollabAll </Typography>
                }
                {
                    !selected && <Typography sx={{ height: '50px' }} component='img' src={dreams_sm} />
                }
                <FormatAlignLeftIcon onClick={() => setSelected(!selected)} sx={{ px: 5 }} />
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 250, borderRadius: '20px', background: '#f1f3f8', boxShadow: 'none' }}
                >
                    <IconButton type="submit" sx={{ p: '10px', }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Here"
                        inputProps={{ 'aria-label': 'search here' }}
                    />

                </Paper>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {/* notification  */}
                <Notification />

                {/* profile  */}
                <Profile />
            </Box>
        </Box>
    );
};

export default Header;