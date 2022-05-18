import Cancel from '@mui/icons-material/Cancel';
import { Avatar, Box, Typography } from '@mui/material';
// import "./general.css"
import styled from '@emotion/styled';
import { Badge } from '@mui/material';
import moment from 'moment'
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: -0.9,
            left: -0.9,
            width: '95%',
            height: '95%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.3)',
            opacity: 0,
        },
    },
}));
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
const SingleProfileInfo = ({ mode, handleClose, caneclBtn, profileInfo }) => {
    return (
        <Box sx={{
            display: 'block',
            padding: {
                lg: "0 20px",
                me: "0 15px",
                sm: "0 40px",
                xs: "0 40px"
            },
        }} >
            <Box style={{
                padding: "20px",
                borderRadius: "5px",
                textAlign: "center",
                marginBottom: "20px",
            }}
            >
                <Box sx={{ mb: "15px" }}>
                    {profileInfo?.online ? <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar style={{ width: '120px', height: '120px', position: 'relative', left: '10px' }} variant="inherit" alt={profileInfo?.pic} src={profileInfo?.pic} />
                    </StyledBadge> :
                        <StyledBadgeOffline
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
                            variant="dot"
                        >
                            <Avatar style={{ width: '120px', height: '120px', position: 'relative', left: '10px' }} variant="inherit" alt={profileInfo?.pic} src={profileInfo?.pic} />
                        </StyledBadgeOffline>

                    }

                    {caneclBtn && <Cancel style={{ position: 'relative', top: '-60px', left: '80px', color: "#ee00ab" }} onClick={handleClose} />}
                    <Typography variant="h5" component="h5" sx={{ font: "20px", fontFamily: "Poppins", fontWeight: "600", color: "#5A078B", marginBottom: "2px" }}>
                        {/* {console.log(profileInfo)} */}
                        {`${profileInfo?.firstName} ${profileInfo?.lastName}`}
                    </Typography>
                    <Typography variant="body" component="body" style={{ fontSize: "13px", fontFamily: "Poppins", color: "#9B9B9B", marginBottom: "2px" }}>
                        {profileInfo?.email}
                    </Typography>
                </Box>
                <Box
                    sx={{ py: 4, }}
                    backgroundColor={mode !== 'dark' ? 'transparent' : '#0d0d0d'}
                >
                    <Box>
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                User Info
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                {profileInfo?.userInfo}
                            </Typography>
                        </Box>
                        {!profileInfo?.online && <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                last Online
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                {moment(profileInfo?.lastOnline)?.format('MMMM Do YYYY, h: mm a') || 'N/A'}
                            </Typography>
                        </Box>}
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                Nick Name
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                {profileInfo?.nickName || 'N/A'}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: "20px" }}>
                            <Typography variant="body" component="body" style={{ fontSize: "14px", fontFamily: "Poppins", color: "#5A078B", fontWeight: "600", }}>
                                Email
                            </Typography>
                            <Typography variant="body" component="body"
                                style={{
                                    fontSize: "14px",
                                    fontFamily: "Poppins",
                                    fontWeight: "500",
                                    color: '#9b9b9b'
                                }}
                            // color={mode !== 'dark' ? '#5A078B' : '#9b9b9b'}
                            >
                                {profileInfo?.email}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

            </Box>

        </Box>
    );
};

export default SingleProfileInfo;