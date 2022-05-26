import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import socket from '../../socket';

const Main = (props) => {
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const { roomName, userName, profile,callType } = useSelector(state => state?.call)
  function clickJoin() {
    if (!roomName || !userName) {
      setErr(true);
      setErrMsg('Invalid Requests Code 400');
    } else {
      socket.emit('BE-check-user', { roomId: roomName, userName, profile });
      navigate(`/${callType}Call/${roomName}`);
    }
  }
  useEffect(() => {
    if (!roomName || !userName) {
      return navigate('/chat')
    }
    socket.on('FE-error-user-exist', ({ error }) => {
      if (!error) {
        sessionStorage.setItem('user', userName);
      } else {
        setErr(error);
        setErrMsg('User name already exist');
      }
    });
    clickJoin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userName, roomName]);

  return (
    <MainContainer>
      {err ? <Error>{errMsg}</Error> : null}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;

export default Main;
