import React from 'react';
import '../ChatMiddle.css'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';

const Footer = () => {
    return (
        <div className="chat-footer">
            <form className='chat_form'>
                <div className="flex_div">
                    <div className="smile-col">
                        <InsertEmoticonIcon/>
                    </div>
                    <div className="attach-col">
                        <AttachFileIcon/>
                    </div>
                    <input type="text" className="form-control" placeholder="Enter Message....."/>
                    <div className="specker-col">
                        <SettingsVoiceIcon/>
                    </div>
                    <div className="form-buttons">
                        <button  type="submit">
                        <SendIcon/>
                    </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Footer;