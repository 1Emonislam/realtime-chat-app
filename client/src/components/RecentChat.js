import EditRoadIcon from '@mui/icons-material/EditRoad';
import { Grid, ToggleButton, Typography } from '@mui/material';
import React from 'react';
import './Chat.css';
import TypingIndicatior from './Typing/TypingIndicatior';
function RecentChat() {
    const data = [
        {
            name: 'Helen',
            img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
            message: 't seems logical that the',
            createdAt: new Date(),
            typing: false,
            read: [],
            online: false
        },
        {
            name: 'Alen',
            img: 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            message: 'It seems logical that the',
            createdAt: new Date(),
            typing: true,
            read: ['2342342342', '2354234234', '2342ahfw432', '234523423'],
            online: true
        },
        {
            name: 'Samira',
            img: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            message: 'It seems logical that the',
            createdAt: new Date(),

            typing: false,
            read: [],
            online: true
        },
        {
            name: 'Fario',
            img: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            message: 'It seems logical that the',
            createdAt: new Date(),
            typing: false,
            read: [],
            online: true
        },
    ]
    const [dataState, setDataState] = React.useState({
        activeObject: null,
        objects: [...data]
    })
    React.useEffect(() => {
        setDataState({ activeObject: dataState?.activeObject, objects: [...data] })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function toggleActive(index) {
        setDataState({ ...dataState, activeObject: dataState.objects[index] })
    }
    function toggleActiveStyle(index) {
        if (dataState.objects[index] === dataState.activeObject) {
            return 'active'
        } else {
            return 'inactive'
        }
    }
    const handleSingleUser = () => {

    }
    return (
        <div>
            <Grid container spacing={0} padding={'25px 20px'} alignItems="center" justifyContent="space-evenly">
                <Grid item xs={8}>
                    <Typography sx={{
                        color: "inherit",
                        fontSize: {
                            lg: 16,
                            md: 16,
                            sm: 15,
                            xs: 10
                        },
                        fontWeight: {
                            lg: 700,
                            md: 600,
                            sm: 500,
                            xs: 400
                        },
                    }} gutterBottom component="div">
                        RECENT CHATS
                    </Typography>
                </Grid>
                <Grid item xs={4} className="headIcon" sx={{ display: 'flex', justifyContent: 'end', color: 'rgba(0, 0, 0, 0.54)' }}>
                    <ToggleButton value="one">
                        <EditRoadIcon sx={{
                            fontSize: {
                                lg: 20,
                                md: 20,
                                sm: 15,
                                xs: 15
                            },
                            fontWeight: {
                                lg: 700,
                                md: 600,
                                sm: 500,
                                xs: 400
                            },
                            borderRadius: {
                                lg: '5px',
                                md: '4px',
                                sm: '3px',
                                xs: '2px'
                            }
                        }} />
                    </ToggleButton>
                </Grid>
            </Grid>
            <Grid container spacing={0} padding={'10px 20px'} alignItems="center" justifyContent="space-evenly">
                {data.map((people, index) => (
                    <Grid key={index} item xs={12} className="user-list">
                        <div style={{ padding: '10px 20px' }} className={toggleActiveStyle(index)} onClick={(e) => handleSingleUser(index, toggleActive(index))} >
                            <Grid container spacing={0} alignItems="center" justifyContent="space-evenly">
                                <Grid item xs={2} sm={1}>
                                    <div className="people-img-box2">
                                        <img src={people.img} alt={people?.name} />
                                        <div className={people?.online ? 'online-active status' : 'online-inactive status'}>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography sx={{
                                        color: "inherit",
                                        fontSize: {
                                            lg: 15,
                                            md: 15,
                                            sm: 15,
                                            xs: 10
                                        },
                                        fontWeight: {
                                            lg: 600,
                                            md: 600,
                                            sm: 500,
                                            xs: 400
                                        },
                                    }} gutterBottom component="div">
                                        {people.name}
                                    </Typography>
                                    {people?.typing ? <TypingIndicatior /> : <>
                                        <Typography sx={{
                                            color: "inherit",
                                            fontSize: {
                                                lg: 14,
                                                md: 14,
                                                sm: 14,
                                                xs: 10
                                            },
                                            fontWeight: {
                                                lg: 400,
                                                md: 400,
                                                sm: 400,
                                                xs: 400
                                            },
                                        }} gutterBottom component="div">
                                            {people.message?.slice(0, 30)}
                                        </Typography>
                                    </>}
                                </Grid>
                                <Grid item xs={2} textAlign="right">
                                    <Typography sx={{
                                        color: "inherit",
                                        fontSize: {
                                            lg: 14,
                                            md: 14,
                                            sm: 14,
                                            xs: 10
                                        },
                                        fontWeight: {
                                            lg: 300,
                                            md: 300,
                                            sm: 300,
                                            xs: 200
                                        },
                                    }} gutterBottom component="div">
                                        05 min
                                    </Typography>
                                    {people?.read?.length !== 0 && <Typography sx={{
                                        textAlign: 'center',
                                        background: 'rgba(0, 255, 179, 0.151)',
                                        borderRadius: '15px',
                                        width: '16px',
                                        height: '16px',
                                        marginLeft: 'auto',
                                        padding: '2px',
                                        color: "inherit",
                                        fontSize: {
                                            lg: 10,
                                            md: 10,
                                            sm: 10,
                                            xs: 10
                                        },
                                        fontWeight: {
                                            lg: 300,
                                            md: 300,
                                            sm: 300,
                                            xs: 200
                                        },
                                    }} gutterBottom component="div">
                                        {people.read.length}
                                    </Typography>}
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default RecentChat