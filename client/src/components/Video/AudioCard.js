import { Tooltip } from '@mui/material';
import React, { useEffect, useRef } from 'react';
const AudioCard = (props) => {
  const ref = useRef();
  const peer = props.peer;
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
    peer.on('track', (track, stream) => {
    });
  }, [peer]);

  return (
    <Tooltip title={peer?.name} arrow>
      <audio
        style={{ width: 0 }}
        playsInline
        autoPlay
        ref={ref}
      />
      {peer?.pic && <img style={{ width: '80px', height: '80px', borderRadius: '80px' }} src={peer?.pic} alt={peer?.name} />}
    </Tooltip>
  );
};

export default AudioCard;
