import React, { useState } from 'react';
import profileImg from '../../../../assets/images/avatar-8.jpg'
import profileImg2 from '../../../../assets/images/avatar-12.jpg'
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SaveIcon from '@mui/icons-material/Save';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteIcon from '@mui/icons-material/Delete';

const ChatBody = () => {
    const [menuOpen,setMenuOpen]=useState(false)
    const [dotsOpen,setdotsOpen]=useState(false)
    const moreActionLef=()=>{
        menuOpen===true?setMenuOpen(false):setMenuOpen(true)
    }
    const moreActionRight=()=>{
        dotsOpen===true?setdotsOpen(false):setdotsOpen(true)
    }
    return (
<div className="chat-body">
    <div className="messages">
      <div className="chats">
        <div className="chat-avatar">
        <img src={profileImg} className="dreams_chat" alt="profile"/>
        </div>
        <div className="chat-content">
        <div className="message-content">
        Hi James! What’s Up?
            <div className="chat-time">
                <div>
                    <div className="time"><AccessTimeFilledIcon/> <span> 10:00</span></div>
                </div>
            </div>
        </div>
        <div className="chat-profile-name">
            <h6>Doris Brown</h6>
        </div>
        </div>
        <div className="chat-action-btns">
            <div className="chat-action-col">
                <Link to='/'>
                    <MoreVertIcon onClick={moreActionLef}/>
                </Link>
                <ul className={menuOpen?'dropdown-menu displayBlock':'dropdown-menu'}>
                    <li><span>Copy</span><FileCopyIcon/></li>
                    <li><span>Save</span><SaveIcon/></li>
                    <li><span>Forward </span><RedoIcon/></li>
                    <li><span>Delete </span><DeleteIcon/></li>
                </ul>
            </div>
        </div>
    </div>


    <div className="chats chats-right">
      <div className="chat-action-btns">
            <div className="chat-action-col">
                <Link to='/'>
                    <MoreVertIcon onClick={moreActionRight}/>
                </Link>
                <div className={dotsOpen?'dropdown-menu displeyBlock':'dropdown-menu'}>
                    <li><span>Copy</span><FileCopyIcon/></li>
                    <li><span>Save</span><SaveIcon/></li>
                    <li><span>Forward </span><RedoIcon/></li>
                    <li><span>Delete </span><DeleteIcon/></li>
                </div>
            </div>
            <div className="chat-read-col">
                <span className="material-icons"><DoneAllIcon/></span>
            </div>
        </div>
        <div className="chat-content">
        <div className="message-content">
            Good morning, How are you? What about our next meeting?
            <div className="chat-time">
                <div>
                 <div className="time"><AccessTimeFilledIcon/> <span>10:00</span></div>
                </div>
            </div>
        </div>
            <div className="chat-profile-name">
                <h6>Alexandr</h6>
            </div>
        </div>

        <div className="chat-avatar">
            <img src={profileImg2} className="dreams_chat" alt=""/>
        </div>
    </div>



    {/* <div className="chats">
    <div className="chat-avatar">
    <img src="assets/img/avatar/avatar-8.jpg" className="rounded-circle dreams_chat" alt="image"/>
    </div>
    <div className="chat-content">
    <div className="message-content">
    &amp; Next meeting tomorrow 10.00AM
    <div className="chat-time">
    <div>
    <div className="time"><i className="fas fa-clock"></i> 10:06</div>
    </div>
    </div>
    </div>
    <div className="chat-profile-name">
    <h6>Doris Brown</h6>
    </div>
    </div>
    <div className="chat-action-btns ms-3">
    <div className="chat-action-col">
    <a className="#" href="#" data-bs-toggle="dropdown">
    <i className="fas fa-ellipsis-h"></i>
    </a>
    <div className="dropdown-menu dropdown-menu-end">
    <a href="#" className="dropdown-item dream_profile_menu">Copy <span><i className="far fa-copy"></i></span></a>
    <a href="#" className="dropdown-item">Save <span className="material-icons">save</span></a>
    <a href="#" className="dropdown-item">Forward <span><i className="fas fa-share"></i></span></a>
    <a href="#" className="dropdown-item">Delete <span><i className="far fa-trash-alt"></i></span></a>
    </div>
    </div>
    </div>
    </div>
    <div className="chat-line">
    <span className="chat-date">Today</span>
    </div>
    <div className="chats chats-right">
    <div className="chat-content">
    <div className="message-content">
    Wow Thats Great
    <div className="chat-time">
    <div>
    <div className="time"><i className="fas fa-clock"></i> 10:02</div>
    </div>
    </div>
    </div>
    <div className="chat-profile-name text-end">
    <h6>Alexandr</h6>
    </div>
    </div>
    <div className="chat-avatar">
    <img src="assets/img/avatar/avatar-12.jpg" className="rounded-circle dreams_chat" alt="image"/>
    </div>
    <div className="chat-action-btns me-2">
    <div className="chat-action-col">
    <a className="#" href="#" data-bs-toggle="dropdown">
    <i className="fas fa-ellipsis-h"></i>
    </a>
    <div className="dropdown-menu dropdown-menu-end">
    <a href="#" className="dropdown-item dream_profile_menu">Copy <span><i className="far fa-copy"></i></span></a>
    <a href="#" className="dropdown-item">Save <span className="material-icons">save</span></a>
    <a href="#" className="dropdown-item">Forward <span><i className="fas fa-share"></i></span></a>
    <a href="#" className="dropdown-item">Delete <span><i className="far fa-trash-alt"></i></span></a>
    </div>
    </div>
    <div className="chat-read-col">
    <span className="material-icons">done_all</span>
    </div>
    </div>
    </div>
    <div className="chats">
    <div className="chat-avatar">
    <img src="assets/img/avatar/avatar-8.jpg" className="rounded-circle dreams_chat" alt="image"/>
    </div>
    <div className="chat-content">
    <div className="message-content">
    <div className="download-col">
    <ul>
    <li>
    <div className="image-download-col">
    <a href="assets/img/chat-download.jpg" data-fancybox="gallery" className="fancybox">
    <img src="assets/img/chat-download.jpg" alt=""/>
    </a>
    <div className="download-action d-flex align-items-center">
    <div><a href="#"><i className="fas fa-cloud-download-alt"></i></a></div>
    <div><a href="#"><i className="fas fa-ellipsis-h"></i></a></div>
    </div>
    </div>
    </li>
    <li>
    <div className="image-download-col image-not-download">
    <a href="assets/img/chat-download.jpg" data-fancybox="gallery" className="fancybox">
    <img src="assets/img/chat-download.jpg" alt=""/>
    </a>
    <div className="download-action d-flex align-items-center">
    <div><a href="#"><i className="fas fa-cloud-download-alt"></i></a></div>
    <div><a href="#"><i className="fas fa-ellipsis-h"></i></a></div>
    </div>
    </div>
    </li>
    <li>
    <div className="image-download-col image-not-download">
    <a href="assets/img/chat-download.jpg" data-fancybox="gallery" className="fancybox">
    <img src="assets/img/chat-download.jpg" alt=""/>
    </a>
    <div className="download-action d-flex align-items-center">
    <div><a href="#"><i className="fas fa-cloud-download-alt"></i></a></div>
    <div><a href="#"><i className="fas fa-ellipsis-h"></i></a></div>
    </div>
    </div>
    </li>
    </ul>
    </div>
    <div className="chat-time">
    <div>
    <div className="time"><i className="fas fa-clock"></i> 10:00</div>
    </div>
    </div>
    </div>
    <div className="chat-profile-name">
    <h6>Doris Brown</h6>
    </div>
    </div>
    <div className="chat-action-btns ms-3">
    <div className="chat-action-col">
    <a className="#" href="#" data-bs-toggle="dropdown">
    <i className="fas fa-ellipsis-h"></i>
    </a>
    <div className="dropdown-menu dropdown-menu-end">
    <a href="#" className="dropdown-item dream_profile_menu">Copy <span><i className="far fa-copy"></i></span></a>
    <a href="#" className="dropdown-item">Save <span className="material-icons">save</span></a>
    <a href="#" className="dropdown-item">Forward <span><i className="fas fa-share"></i></span></a>
    <a href="#" className="dropdown-item">Delete <span><i className="far fa-trash-alt"></i></span></a>
    </div>
    </div>
    </div>
    </div>


    
    <div className="chats chats-right">
    <div className="chat-content">
    <div className="message-content">
    <div className="file-download d-flex align-items-center">
    <div className="file-type d-flex align-items-center justify-content-center me-2">
    <i className="far fa-file-archive"></i>
    </div>
    <div className="file-details">
    <span className="file-name">filename.zip</span>
    <span className="file-size">10.6MB</span>
    </div>
    <div className="download-action d-flex align-items-center">
    <div><a href="#"><i className="fas fa-cloud-download-alt"></i></a></div>
    <div><a href="#"><i className="fas fa-ellipsis-h"></i></a></div>
    </div>
    </div>
    <div className="chat-time">
    <div>
    <div className="time"><i className="fas fa-clock"></i> 10:02</div>
    </div>
    </div>
    </div>
    <div className="chat-profile-name text-end">
    <h6>Alexandr</h6>
    </div>
    </div>
    <div className="chat-avatar">
    <img src="assets/img/avatar/avatar-12.jpg" className="rounded-circle dreams_chat" alt="i"/>
    </div>
    <div className="chat-action-btns me-2">
    <div className="chat-action-col">
    <a className="#" href="#" data-bs-toggle="dropdown">
    <i className="fas fa-ellipsis-h"></i>
    </a>
    <div className="dropdown-menu dropdown-menu-end">
    <a href="#" className="dropdown-item dream_profile_menu">Copy <span><i className="far fa-copy"></i></span></a>
    <a href="#" className="dropdown-item">Save <span className="material-icons">save</span></a>
    <a href="#" className="dropdown-item">Forward <span><i className="fas fa-share"></i></span></a>
    <a href="#" className="dropdown-item">Delete <span><i className="far fa-trash-alt"></i></span></a>
    </div>
    </div>
    <div className="chat-read-col">
    <span className="material-icons">done_all</span>
    </div>
    </div>
    </div> */}
  </div>
</div>
    );
};

export default ChatBody;