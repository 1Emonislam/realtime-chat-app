
import { Box, Tab } from '@mui/material';
import React from 'react';

const Media = () => {
    return (
      
        <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {/* <TabList onChange={handleChange} aria-label="lab API tabs example"> */}
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            {/* </TabList> */}
          </Box>
          {/* <TabPanel value="1">Item One</TabPanel> */}
          {/* <TabPanel value="2">Item Two</TabPanel> */}
          {/* <TabPanel value="3">Item Three</TabPanel> */}
         </TabContext>
      </Box>
        
    );
};

export default Media;