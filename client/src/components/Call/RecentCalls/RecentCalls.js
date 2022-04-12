import { Box } from '@mui/system';
import React from 'react';
import RecentCallList from '../RecentCallList/RecentCallList';

const RecentCalls = () => {

    const data = [
      {
        id: 1,
        name: "Regina Dickerson",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/d22b19c4c5ab4297d011191f7fb14503.jpg",
        called: 1,
        status: "Outgoing",
        videoCall: true,
        callMissed: false,
      },
      {
        id: 2,
        name: "Forest Kroch",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/2cfd5ba6f0dee8d1d076293e37106695.jpg",
        called: 9,
        status: "Incoming",
        videoCall: false,
        callMissed: false,
      },
      {
        id: 3,
        name: "Look Emerson",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/5ba5195e48f4c2c3c3fa828bcc7d9d98.jpg",
        called: 5,
        status: "Missed",
        videoCall: false,
        callMissed: true,
      },
      {
        id: 4,
        name: "Townsend Seary",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/5ba5195e48f4c2c3c3fa828bcc7d9d98.jpg",
        called: 3,
        status: "Incoming",
        videoCall: false,
        callMissed: false,
      },
      {
        id: 5,
        name: "Margaretta Worvell",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/ad5418a90c29c2b98640c416862a81c4.jpg",
        called: 4,
        status: "Outgoing",
        videoCall: false,
        callMissed: false,
      },
      {
        id: 6,
        name: "#Tech Support",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/18fa291c9821cac1634b93a38f2ad915.jpg",
        called: 2,
        status: "Outgoing",
        videoCall: true,
        callMissed: false,
      },
      {
        id: 7,
        name: "Alexandar Donally",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/18fa291c9821cac1634b93a38f2ad915.jpg",
        called: 12,
        status: "Incoming",
        videoCall: false,
        callMissed: false,
      },
      {
        id: 8,
        name: "Riyana Smith",
        pic: "https://dreamschat-reactjs.dreamguystech.com/template2/057ac47883314214809f648325f180a4.jpg",
        called: 15,
        status: "Incoming",
        videoCall: true,
        callMissed: true,
      },
    ];
    return (
      <Box sx={{ mb: 5, mt: 0 }}>
       

        <div>
          {data?.map((p) => (
            <RecentCallList p={p}></RecentCallList>
          ))}
        </div>
      </Box>
    );
};

export default RecentCalls;