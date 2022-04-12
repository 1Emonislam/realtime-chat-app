import { Box, Typography } from '@mui/material';
import React from 'react';
import Statuses from './Statuses';

const RecentStatus = () => {
    const data = [
      {
        name: "Regina Dickerson",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/d22b19c4c5ab4297d011191f7fb14503.jpg",
        status: "Just Now",
      },
      {
        name: "Forest Kroch",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/2cfd5ba6f0dee8d1d076293e37106695.jpg",
        status: "2 min ago",
      },
      {
        name: "Regina Dickerson",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/5ba5195e48f4c2c3c3fa828bcc7d9d98.jpg",
        status: "4 min ago",
      },
      {
        name: "TownSend Searry",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/d22b19c4c5ab4297d011191f7fb14503.jpg",
        status: "5 min ago",
      },
      {
        name: "Margaratta Woell",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/ad5418a90c29c2b98640c416862a81c4.jpg",
        status: "8 min ago",
      },
    ];
    
    return (
      <Box sx={{mb: 5, mt: 0}}>
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: "bold", color: "#5A078B" }}
          style={{ fontFamily: `"Poppins", sans-serif` }}
        >
          RECENT STATUS
        </Typography>

        <div>
          {data?.map((p,index) => (
            <Statuses p={p}key={index}></Statuses>
          ))}
        </div>
      </Box>
    );
};

export default RecentStatus;