import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import ProfileGroupList from './ProfileGroupList';
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

export default function GroupMemberShow({ memberInfo }) {
    // console.log(memberInfo)
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab style={{ fontWeight: "bold", fontFamily: `"Poppins", sans-serif`, marginRight: '110px' }} label="Group Members" {...a11yProps(0)} />
                    <Tab style={{ fontWeight: "bold", fontFamily: `"Poppins", sans-serif` }} label="Group Admins" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProfileGroupList memberInfo={memberInfo?.chat?.members} />
            </TabPanel>
            <TabPanel value={value} index={1}>
            <ProfileGroupList memberInfo={memberInfo?.chat?.groupAdmin} />
            </TabPanel>
        </Box>
    );
}