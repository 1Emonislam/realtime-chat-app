import { Grid, ToggleButton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import './../../components/__Container.css';
import PeopleOffline from './PeopleOffline';
import PeopleOnline from './PeopleOnline';
// switch Button
const OnlineOfline = () => {
    const [selected, setSelected] = React.useState(false);
    const { selectedChat} = useSelector(state => state);
    const members = selectedChat?.chat?.members;
    const online = members?.filter(online => online?.online === true);
    const offline = members?.filter(offline => offline?.online === false);
    return (
        <div className='current-user-about'>
            {members?.length !== 0 && <Grid container spacing={0}>
                <Grid item xs={12}>
                    <ToggleButton value="check"
                        selected={selected}
                        style={{ border: 'none', textTransform: 'capitalize' }}
                        onChange={() => {
                            setSelected(false);
                        }}>
                        <Typography style={{ margin: '10px 0' }}> Online </Typography>
                    </ToggleButton>
                    { <PeopleOnline online={online} />}

                </Grid>
                <Grid item xs={12}>
                    <ToggleButton value="check"
                        selected={selected}
                        style={{ border: 'none', textTransform: 'capitalize', }}
                        onChange={() => {
                            setSelected(false);
                        }}>
                        <Typography style={{ marginTop: '20px', marginBottom: '10px' }}> Offline </Typography>
                    </ToggleButton>
                    {<PeopleOffline offline={offline} />}
                </Grid>
            </Grid>}
        </div>
    );
};

export default OnlineOfline;