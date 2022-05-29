import { Grid, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DocViewer from 'react-doc-viewer';
import { useDispatch, useSelector } from 'react-redux';
import { mediaFilesSearchAudios, mediaFilesSearchImages, mediaFilesSearchOthers, mediaFilesSearchVideos, mediaFilesSearchVoice } from '../../../../store/actions/mediaFilesSearchAction';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MediaDetails() {
  const [value, setValue] = React.useState(0);
  const { media, selectedChat } = useSelector(state => state);
  const { audios, videos, others, voice, images } = media;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(audios, videos, others, voice, images)
  const dispatch = useDispatch()
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1)
  const limit = 10;
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', textTransform: 'capitalize', alignItems: 'center', justifyContent: 'center' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Images" {...a11yProps(0)} onClick={() => {
            dispatch(mediaFilesSearchImages('images', selectedChat?.chat?._id, page, limit, setCount))
          }} />
          <Tab label="Voice" {...a11yProps(0)} onClick={() => {
            dispatch(mediaFilesSearchVoice('voice', selectedChat?.chat?._id, page, limit, setCount))
          }} />
          <Tab label="Audios" {...a11yProps(1)} onClick={() => {
            dispatch(mediaFilesSearchAudios('audio', selectedChat?.chat?._id, page, limit, setCount))
          }} />
          <Tab label="Videos" {...a11yProps(2)} onClick={() => {
            dispatch(mediaFilesSearchVideos('video', selectedChat?.chat?._id, page, limit, setCount))
          }} />
          <Tab label="Others" {...a11yProps(3)} onClick={() => {
            dispatch(mediaFilesSearchOthers('others', selectedChat?.chat?._id, page, limit, setCount))
          }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
          <Grid container spacing={0}>
            {
              images?.length !== 0 && images?.map((pic, index) => (
                <Grid item xs={3} key={index}>
                  <img width={'100%'} alt={pic?.filename} src={pic?.url} />
                </Grid>
              ))}
          </Grid>
        <Pagination
          count={Math.ceil(count / limit)}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
          <Grid container spacing={0}>
            {
              voice?.length !== 0 && voice?.map((voice, index) => (
                <Grid item xs={6} key={index}>
                  <audio style={{ width: '100%' }} src={voice?.url} controls> </audio>
                </Grid>
              ))}
          </Grid>
        <Pagination
          count={Math.ceil(count / limit)}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
          <Grid container spacing={0}justifyContent="space-between">
            {
              audios?.length !== 0 && audios?.map((audio, index) => (
                <Grid item xs={6} key={index}>
                  <audio style={{ width: '100%' }} src={audio?.url} controls> </audio>
                </Grid>
              ))}
          </Grid>
        <Pagination
          count={Math.ceil(count / limit)}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
          <Grid container spacing={0}>
            {
              videos?.length !== 0 && videos?.map((video, index) => (
                <Grid item xs={6} key={index}>
                  <video style={{ width: '100%' }} src={video?.url} controls> </video>
                </Grid>
              ))}
          </Grid>
        <Pagination
          count={Math.ceil(count / limit)}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
          <Grid container spacing={0}>
            {
              others?.length !== 0 && others?.map((other, index) => (
                <Grid item xs={3} key={index}>
                  <DocViewer documents={[{
                    uri:
                      other?.url
                  },]} />
                </Grid>
              ))}
          </Grid>
        <Pagination
          count={Math.ceil(count / limit)}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(value)}
        />
      </TabPanel>
    </Box>
  );
}