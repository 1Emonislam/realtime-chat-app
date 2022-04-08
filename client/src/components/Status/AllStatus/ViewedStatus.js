import { Box, Typography } from '@mui/material';
import React from 'react';
import ViewedStatuses from './ViewedStatuses';

const ViewedStatus = () => {
     const data = [
       {
         name: "#Tech Support",
         pic: "https://dreamschat-reactjs.dreamguystech.com/template2/18fa291c9821cac1634b93a38f2ad915.jpg",
         status: "9 min ago",
       },
       {
         name: "Horald Kowalski",
         pic: "https://dreamschat-reactjs.dreamguystech.com/template2/2cfd5ba6f0dee8d1d076293e37106695.jpg",
         status: "11 min ago",
       },
       {
         name: "Alexandar Donaley",
         pic: "https://dreamschat-reactjs.dreamguystech.com/template2/5ba5195e48f4c2c3c3fa828bcc7d9d98.jpg",
         status: "12 min ago",
       },
      
     ];
    return (
      <Box>
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: "bold", color: "#5A078B", }}
          style={{ fontFamily: `"Poppins", sans-serif` }}
        >
          VIEWED STATUS
        </Typography>
        <div>
          {data?.map((p) => (
            <ViewedStatuses p={p}></ViewedStatuses>
          ))}
        </div>
      </Box>
    );
};

export default ViewedStatus;