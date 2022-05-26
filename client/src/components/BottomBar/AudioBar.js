import { FaPhone } from 'react-icons/fa';
import styled from 'styled-components';

const AudioBar = ({
    clickChat,
    goToBack,
    handleEndCall,
    userVideoAudio,
    toggleCameraAudio
}) => {

    return (
        <Bar style={{ display: 'flex', alignItems: 'center' }}>
            <Center>
                <CameraButton onClick={toggleCameraAudio} data-switch='audio'>
                    <div>
                        {userVideoAudio.audio ? (
                            <FaIcon className='fas fa-microphone'></FaIcon>
                        ) : (
                            <FaIcon className='fas fa-microphone-slash'></FaIcon>
                        )}
                    </div>
                </CameraButton>
            </Center>
            <Center>
                <ChatButton onClick={clickChat}>
                    <div>
                        <FaIcon className='fas fa-comments'></FaIcon>
                    </div>
                </ChatButton>
                <EndCall onClick={handleEndCall}>
                    <div>
                        <FaPhone />
                    </div>
                </EndCall>
            </Center>
            <Right>
                <StopButton onClick={goToBack}>Leave Me</StopButton>
            </Right>
        </Bar>
    );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  color:gray;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items:center;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  width: 45px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: transparent;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const CameraButton = styled.div`
  position: relative;
  width: 75px;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: transparent;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;
const EndCall = styled.div`
  width: auto;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color:transparent;
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: #ee2560;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
  width: 75px;
  height: 30px;
  border: none;
  font-size: 0.9375rem;
  line-height: 30px;
  margin-right: 15px;
  background-color: transparent;
  border-radius: 15px;

  :hover {
    background-color: transparent;
    cursor: pointer;
  }
`;

export default AudioBar;