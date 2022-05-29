import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { PaginationContext } from '../../../App';
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
    const { pageMembers } = useSelector(state => state)
    const paginationContext = useContext(PaginationContext);

    const {
        pageUser,
        setPageUser,
        countMember,
        // setCountMember,
        countAdmin,
        // setCountAdmin,
        limitUser
    } = paginationContext;
    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab style={{ fontWeight: "bold", fontFamily: `"Poppins", sans-serif`, marginRight: '40px' }} label="Group Members" {...a11yProps(0)} />
                    <Tab style={{ fontWeight: "bold", fontFamily: `"Poppins", sans-serif` }} label="Group Admins" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ProfileGroupList memberInfo={pageMembers?.members} count={countMember} limit={limitUser} setPage={setPageUser} page={pageUser} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfileGroupList memberInfo={pageMembers?.groupAdmin} count={countAdmin} limit={limitUser} setPage={setPageUser} page={pageUser} />
            </TabPanel>
        </Box>
    );
}