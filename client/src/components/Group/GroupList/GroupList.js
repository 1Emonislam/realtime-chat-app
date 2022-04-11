import React from 'react';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import { Grid, ToggleButton, Typography } from '@mui/material';
import '../Group.css';
import TypingIndicatior from '../../Typing/TypingIndicatior';
import { FamilyRestroomTwoTone } from '@mui/icons-material';
import GroupListMap from './GroupListMap';

const GroupList = () => {
    const data = [
      {
        id: 1,
        name: "Fashion Plus",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/11c49a9c1cc550ba5638759ece5e2fe8.jpg",
        lastMsgBy: "Moien",
        lastMsg: "Hi!!!",
        isPrivateGroup: true,
        time: 20,
        unreadMsg: 11,
        online: true,
      },
      {
        id: 2,
        name: "Tech Support",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/c1bef1fe26f16d517d297b0c1b528a87.jpg",
        lastMsgBy: "Haider",
        lastMsg: "Hey, Everyone",
        isPrivateGroup: false,
        time: 22,
        unreadMsg: 13,
        online: false,
      },
      {
        id: 3,
        name: "Home Decor",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/1a549a96b96553628894614e63e88f66.jpg",
        lastMsgBy: "Jonathon",
        lastMsg: "no man",
        isPrivateGroup: false,
        time: 23,
        unreadMsg: 50,
        online: true,
      },
      {
        id: 4,
        name: "Interior Design",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/d8d2cb3f0fd61fce5941626678a6da48.jpg",
        lastMsgBy: "Judy",
        lastMsg: "I can't",
        isPrivateGroup: true,
        time: 33,
        unreadMsg: 21,
        online: true,
      },
      {
        id: 5,
        name: "Photography",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/01d930c3c77a6913c6ff448c51bc404c.jpg",
        lastMsgBy: "Degro",
        lastMsg: "Yeah",
        isPrivateGroup: false,
        time: 35,
        unreadMsg: 34,
        online: false,
      },
      {
        id: 6,
        name: "Interiors",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/d4b622bdb3beef25063aede138d39f28.jpg",
        lastMsgBy: "Jean",
        lastMsg: "nope",
        isPrivateGroup: true,
        time: 36,
        unreadMsg: 52,
        online: true,
      },
      {
        id: 7,
        name: "Inspiration",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/72b51ec6c83dc6819daf751b8db6b3f8.jpg",
        lastMsgBy: "Robert",
        lastMsg: "solved",
        isPrivateGroup: false,
        time: 40,
        unreadMsg: 36,
        online: false,
      },
      {
        id: 8,
        name: "Artwork",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/c1bef1fe26f16d517d297b0c1b528a87.jpg",
        lastMsgBy: "Josh",
        lastMsg: "lovely",
        isPrivateGroup: false,
        time: 41,
        unreadMsg: 34,
        online: true,
      },
      {
        id: 9,
        name: "Handmade",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/d22b19c4c5ab4297d011191f7fb14503.jpg",
        lastMsgBy: "Susan",
        lastMsg: "great",
        isPrivateGroup: false,
        time: 45,
        unreadMsg: 12,
        online: true,
      },
      {
        id: 10,
        name: "Design",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/2cfd5ba6f0dee8d1d076293e37106695.jpg",
        lastMsgBy: "Hamit",
        lastMsg: "I can do that",
        isPrivateGroup: true,
        time: 56,
        unreadMsg: 14,
        online: true,
      },
    ];
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
      <div style={{ marginTop: "-40px" }}>
        <Grid
          container
          spacing={0}
          sx={{
            padding: {
              lg: "10px 20px",
              md: "10px 15px",
              sm: "10px 40px",
              xs: "5px 40px",
            },
            marginTop: {
              xs: "20px",
            },
          }}
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={8}>
            <Typography
              sx={{
                color: "#5A078B",
                fontSize: {
                  lg: 16,
                  md: 16,
                  sm: 15,
                  xs: 10,
                },

                fontWeight: {
                  lg: 700,
                  md: 600,
                  sm: 500,
                  xs: 500,
                },
                fontFamily: `"Poppins", sans-serif`,
              }}
              gutterBottom
              component="div"
            >
              RECENT CHATS
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            className="headIcon"
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "rgba(0, 0, 0, 0.54)",
            }}
          ></Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          padding={"10px 0px"}
          justifyContent="center"
        >
          {data.map((p) => (
            <GroupListMap p={p} key={p.id} />
          ))}
        </Grid>
      </div>
    );
}

export default GroupList;