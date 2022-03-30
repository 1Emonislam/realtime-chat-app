import { Badge, Box, FormControlLabel, FormGroup, Grid, IconButton, Switch, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import styles from './AboutPage.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { styled } from '@mui/material/styles';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// switch Button
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

//   switch button functionality end

const AboutPage = ({isDark}) => {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
        <Box className={styles.mainAboutSection}>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <Typography className={styles.subtitles} variant="subtitle2" gutterBottom component="div">
                        h6. Heading
                    </Typography>
                    <IconButton sx={{p:0}} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <CloseIcon sx={{ bgcolor: '#ec407a', color: 'whiteSmoke', borderRadius: 15, fontSize: 20, p: 0.3, }} />
                    </IconButton>
            </Box>
            <Box className={styles.aboutSection}>
                    <img className={styles.profileImage} src="https://dreamschat.dreamguystech.com/template2/assets/img/avatar/avatar-2.jpg" alt="" />
                    <Typography className={styles.titles} variant="subtitle2" gutterBottom component="div">
                        Name
                    </Typography>
                    <Badge
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                     color="primary" overlap="circular" badgeContent="" variant="dot">
                            <Typography sx={{marginTop:-1, marginLeft:2}} variant="caption" gutterBottom component="div">
                                online
                            </Typography>
                        
                    </Badge>

            </Box>
            <Box sx={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    
                >
                    <Tab sx={{fontSize:12, fontWeight:700}} value="one" label="ABOUT" />
                    <Tab sx={{fontSize:12, fontWeight:700}} value="two" label="MEDIA" />
                </Tabs>
            </Box>
            {value==='one' ? <Box sx={{mt:3}}>
                <Typography className={styles.aboutText} variant="subtitle2" gutterBottom component="div">
                If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.
                </Typography>
                <Typography sx={{mt:3}} className={styles.subtitles} variant="subtitle2" gutterBottom component="div">
                Phone
                </Typography>
                <Typography className={styles.aboutText} variant="subtitle2" gutterBottom component="div">
                555-555-21541
                </Typography>
                <Typography sx={{mt:3}} className={styles.subtitles} variant="subtitle2" gutterBottom component="div">
                Nick Name
                </Typography>
                <Typography className={styles.aboutText} variant="subtitle2" gutterBottom component="div">
                Alberywo
                </Typography>
                <Typography sx={{mt:3}} className={styles.subtitles} variant="subtitle2" gutterBottom component="div">
                Social media accounts
                </Typography>
                <Box>
                    <IconButton sx={{p:0}} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <FacebookOutlinedIcon sx={{ color:`${isDark==='dark' ? '#ec407a' : '#420ba1'}`, borderRadius: 15, fontSize: 22, mr:1 }} />
                    </IconButton>
                    <IconButton  sx={{p:0}} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <TwitterIcon sx={{ color:`${isDark==='dark' ? '#ec407a' : '#420ba1'}`, borderRadius: 15, fontSize: 22, mr:1 }} />
                    </IconButton>
                    <IconButton sx={{p:0}}  aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <YouTubeIcon sx={{ color:`${isDark==='dark' ? '#ec407a' : '#420ba1'}`, borderRadius: 15, fontSize: 22, mr:1 }} />
                    </IconButton>
                    <IconButton  sx={{p:0}} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <InstagramIcon sx={{ color:`${isDark==='dark' ? '#ec407a' : '#420ba1'}`, borderRadius: 15, fontSize: 22, mr:1 }} />
                    </IconButton>
                    <IconButton  sx={{p:0}} aria-label="Example">
                        {/* <FontAwesomeSvgIcon icon={faEllipsisV} /> */}
                        <LinkedInIcon sx={{ color:`${isDark==='dark' ? '#ec407a' : '#420ba1'}`, borderRadius: 15, fontSize: 22, mr:1 }} />
                    </IconButton>
                </Box>
                <Typography sx={{mt:3}} className={styles.subtitles} variant="subtitle2" gutterBottom component="div">
                Settings
                </Typography>
                <Box>
                    <FormGroup>
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1  }}  />}
                            label="Block"
                        />
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1  }}  />}
                            label="Mute"
                        />
                        <FormControlLabel
                            control={<IOSSwitch sx={{ m: 1  }}  />}
                            label="Get notification"
                        />
                    </FormGroup>
                </Box>
            </Box>
            :
            <Box sx={{mt:6}}>
                <Grid container spacing={1}>
                    <Grid sx={{position:'relative'}} item xs={6}>
                        <img style={{with:'100%', height:'115px', zIndex:1}} src="https://i.ibb.co/cXGVxJP/product-9.jpg" alt="" />
                        <Box sx={{display:'flex', position:'absolute', right:2, bottom:8}}> 
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <CloudDownloadIcon sx={{fontSize:20, zIndex:5, color:'white',marginRight:1}} />
                                </IconButton>
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <MoreHorizIcon sx={{fontSize:20, zIndex:5, color:'white'}} />
                                </IconButton>
                        </Box>
                    </Grid>
                    <Grid sx={{position:'relative'}} item xs={6}>
                        <img style={{with:'100%', height:'115px', zIndex:1}} src="https://i.ibb.co/cXGVxJP/product-9.jpg" alt="" />
                        <Box sx={{display:'flex', position:'absolute', right:2, bottom:8}}> 
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <CloudDownloadIcon sx={{fontSize:20, zIndex:5, color:'white',marginRight:1}} />
                                </IconButton>
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <MoreHorizIcon sx={{fontSize:20, zIndex:5, color:'white'}} />
                                </IconButton>
                        </Box>
                    </Grid>
                    <Grid sx={{position:'relative'}} item xs={6}>
                        <img style={{with:'100%', height:'115px', zIndex:1}} src="https://i.ibb.co/cXGVxJP/product-9.jpg" alt="" />
                        <Box sx={{display:'flex', position:'absolute', right:2, bottom:8}}> 
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <CloudDownloadIcon sx={{fontSize:20, zIndex:5, color:'white',marginRight:1}} />
                                </IconButton>
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <MoreHorizIcon sx={{fontSize:20, zIndex:5, color:'white'}} />
                                </IconButton>
                        </Box>
                    </Grid>
                    <Grid sx={{position:'relative'}} item xs={6}>
                        <img style={{with:'100%', height:'115px', zIndex:1}} src="https://i.ibb.co/cXGVxJP/product-9.jpg" alt="" />
                        <Box sx={{display:'flex', position:'absolute', right:2, bottom:8}}> 
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <CloudDownloadIcon sx={{fontSize:20, zIndex:5, color:'white',marginRight:1}} />
                                </IconButton>
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <MoreHorizIcon sx={{fontSize:20, zIndex:5, color:'white'}} />
                                </IconButton>
                        </Box>
                    </Grid>
                    <Grid sx={{position:'relative'}} item xs={6}>
                        <img style={{with:'100%', height:'115px', zIndex:1}} src="https://i.ibb.co/cXGVxJP/product-9.jpg" alt="" />
                        <Box sx={{display:'flex', position:'absolute', right:2, bottom:8}}> 
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <CloudDownloadIcon sx={{fontSize:20, zIndex:5, color:'white',marginRight:1}} />
                                </IconButton>
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <MoreHorizIcon sx={{fontSize:20, zIndex:5, color:'white'}} />
                                </IconButton>
                        </Box>
                    </Grid>
                    <Grid sx={{position:'relative'}} item xs={6}>
                        <img style={{with:'100%', height:'115px', zIndex:1}} src="https://i.ibb.co/cXGVxJP/product-9.jpg" alt="" />
                        <Box sx={{display:'flex', position:'absolute', right:2, bottom:8}}> 
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <CloudDownloadIcon sx={{fontSize:20, zIndex:5, color:'white',marginRight:1}} />
                                </IconButton>
                                <IconButton  sx={{p:0}} aria-label="Example">
                                    <MoreHorizIcon sx={{fontSize:20, zIndex:5, color:'white'}} />
                                </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Link to="">
                    <Typography sx={{ color:'red', display:'flex', alignItems:'center', justifyContent:'center', mt:1, textAlign:'center'}} variant="subtitle2" gutterBottom component="div">
                    Report Chat <span><ArrowDropDownIcon/></span>
                    </Typography>
                </Link>
            </Box>}


            <Link to="">
                <Typography sx={{ color:'red', display:'flex', alignItems:'center', mt:5}} variant="subtitle2" gutterBottom component="div">
                <span><ReportProblemIcon/></span> &nbsp; Report Chat
                </Typography>
            </Link>
            <Link to="">
                <Typography sx={{ color:'red', display:'flex', alignItems:'center', mt:1}} variant="subtitle2" gutterBottom component="div">
                <span><DeleteOutlineIcon/></span> &nbsp; Report Chat
                </Typography>
            </Link>
        </Box>
    );
};

export default AboutPage;