import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank"
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline"
import Forum from "@mui/icons-material/Forum"
import PriorityHigh from "@mui/icons-material/PriorityHigh"
import QuestionMark from "@mui/icons-material/QuestionMark"
import Replay from "@mui/icons-material/Replay"
import SentimentDissatisfied from "@mui/icons-material/SentimentDissatisfied"
import ThumbDown from "@mui/icons-material/ThumbDown"
import ThumbUpAlt from "@mui/icons-material/ThumbUpAlt"
import { Avatar, AvatarGroup, Chip, Divider, Grid, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import DocViewer from 'react-doc-viewer'
import { useDispatch, useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import { toast } from "react-toastify"
import confusedImg from '../../../../Ashikur/chatRepliedImages/confused.png'
import questionImg from '../../../../Ashikur/chatRepliedImages/question.png'
import resendImg from '../../../../Ashikur/chatRepliedImages/resend.png'
import SingleProfile from "../../../../components/ChatProfile/Profile/SingleProfile"
import Loading from '../../../../components/Spinner/Loading'
import TypingIndicator from '../../../../components/Typing/TypingIndicatior'
import Editor from '../../../../Editor/Editor'
import { AUTH_ERROR, AUTH_MESSAGE } from "../../../../store/type/authType"
import { SINGLE_PROFILE_FAILED, SINGLE_PROFILE_SUCCESS } from "../../../../store/type/profileType"
import MessageFunc from '../ChatBody/MessageFunc'
import { chatExists, isLastMessage, isSameSender, isSameSenderMargin, isSameSenderPermission, isSameUser } from './chatLogic'
import DefualtMessage from "./DefualtMessage"

function ScrollChat({ messages, user, handleTyping, isTyping }) {
    const { selectedChat, groupMessage, uploads } = useSelector(state => state);
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const { auth, theme } = useSelector(state => state)
    if (auth?.message) {
        toast.success(`${auth?.message}`, {
            position: "bottom-right",
            theme: theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        dispatch({
            type: AUTH_MESSAGE
        })
    }
    if (auth?.error) {
        Object.values(auth?.error)?.forEach((err) => {
            toast.error(`${err}`, {
                position: "bottom-right",
                theme: theme?.theme,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            dispatch({
                type: AUTH_ERROR
            })
        })
    }
    const handleCurrentProfile = (id) => {
        if (id) {
            fetch(`https://collaballapp.herokuapp.com/api/auth/single/profile/get/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${auth?.user?.token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        dispatch({
                            type: SINGLE_PROFILE_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                        handleOpen()
                    }
                    if (data?.error) {
                        dispatch({
                            type: SINGLE_PROFILE_FAILED,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
    }
    return (
        <div style={{ width: '100%' }}>

            <ScrollableFeed style={{ overflow: 'hidden' }}>
                {groupMessage?.loading
                    ?
                    <Loading style={{ marginTop: "50px" }} />
                    :
                    <>
                        <div style={{ marginTop: "50px" }}>
                            {messages?.length !== 0 && messages?.length && messages?.map((m, i) => (
                                <span key={i}>
                                    <div style={{ display: "flex", alignItems: 'center', marginBottom: '10px', marginLeft: '20px' }} ref={messagesEndRef}>
                                        <div>

                                            {(isSameSender(messages, m, i, user._id) ||
                                                isLastMessage(messages, i, user._id)) && (
                                                    <Tooltip onClick={() => handleCurrentProfile(m.sender?._id)} style={{ cursor: "pointer" }} title={m?.sender?.firstName + ' ' + m?.sender?.lastName}
                                                        placement="bottom-start" aria-haspopup arrow>
                                                        <Avatar
                                                            sx={{ cursor: 'pointer', marginTop: '7px', marginRight: '25px' }}
                                                            size="sm"
                                                            cursor="pointer"
                                                            name={m.sender.name}
                                                            src={m.sender.pic}
                                                        />
                                                    </Tooltip>
                                                )}
                                        </div>
                                        <span
                                            style={{
                                                backgroundColor: `${m?.sender?._id === user?._id ? "#5865f2" : "#E8EFFF"
                                                    }`,
                                                color: `${m?.sender?._id === user?._id ? "white" : "black"
                                                    }`,
                                                marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                borderRadius: " 20px 20px 20px 0",
                                                padding: "8px 14px",
                                                fontWeight: "500",
                                            }}
                                        >
                                            <Tooltip style={{ position: 'absolute', left: '-20px', top: '18px', color: 'blue', fontWeight: '900' }} arrow title="More" placement="top">
                                                <span>
                                                    {user?._id && <MessageFunc handleTyping={handleTyping} isTyping={isTyping} isSameSenderPermission={isSameSenderPermission(messages, m, i, user?._id)} message={m?.content?.text} messageInfo={m} />}
                                                </span>
                                            </Tooltip>
                                            {<>
                                                <div>
                                                    <Typography sx={{
                                                        color: "inherit",
                                                        fontSize: {
                                                            lg: 12,
                                                            md: 10,
                                                            sm: 10,
                                                            xs: 10
                                                        },
                                                        fontWeight: {
                                                            lg: 200,
                                                            md: 200,
                                                            sm: 200,
                                                            xs: 200
                                                        },
                                                    }}>
                                                        {
                                                            !moment(m?.updatedAt)?.fromNow()?.includes("few seconds")
                                                                ?
                                                                moment(m?.updatedAt).fromNow()
                                                                :
                                                                "just now"

                                                        }

                                                    </Typography>
                                                </div>
                                                {/* {console.log(m)} */}
                                                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                                                    {
                                                        m?.content?.text?.toLowerCase() === "question?" ||
                                                            m?.content?.text?.toLowerCase() === "don't understand!" ||
                                                            m?.content?.text?.toLowerCase() === "repeat!" ||
                                                            m?.content?.text?.toLowerCase() === "forumicon" ||
                                                            m?.content?.text?.toLowerCase() === "blankboxicon" ||
                                                            m?.content?.text?.toLowerCase() === "checkedicon" ||
                                                            m?.content?.text?.toLowerCase() === "questionicon" ||
                                                            m?.content?.text?.toLowerCase() === "replyicon" ||
                                                            m?.content?.text?.toLowerCase() === "priorityicon" ||
                                                            m?.content?.text?.toLowerCase() === "thumbupicon" ||
                                                            m?.content?.text?.toLowerCase() === "thumbdownicon" ||
                                                            m?.content?.text?.toLowerCase() === "sentimenticon"
                                                            ?
                                                            <>
                                                                {
                                                                    m?.content?.text?.toLowerCase() === "question?" ||
                                                                        m?.content?.text?.toLowerCase() === "don't understand!" ||
                                                                        m?.content?.text?.toLowerCase() === "repeat!"

                                                                        ?

                                                                        <img

                                                                            style={{ height: '25px', marginLeft: '7px', position: 'relative' }}
                                                                            src={m?.content?.confused?.icon?.toLowerCase() === "question?" ? questionImg
                                                                                :
                                                                                m?.content?.confused?.icon?.toLowerCase() === "don't understand!" ? confusedImg
                                                                                    :
                                                                                    m?.content?.text?.toLowerCase() === "repeat!" ? resendImg : ""
                                                                            }
                                                                            alt=''
                                                                        />
                                                                        :

                                                                        <>
                                                                            {
                                                                                m?.content?.text?.toLowerCase() === "forumicon" ? <Forum sx={{ color: 'black' }} />
                                                                                    :
                                                                                    m?.content?.text?.toLowerCase() === "blankboxicon" ? <CheckBoxOutlineBlank sx={{ color: 'black' }} />
                                                                                        :
                                                                                        m?.content?.text?.toLowerCase() === "checkedicon" ? <CheckCircleOutline sx={{ color: 'black' }} />
                                                                                            :
                                                                                            m?.content?.text?.toLowerCase() === "questionicon" ? <QuestionMark sx={{ color: 'black' }} />
                                                                                                :
                                                                                                m?.content?.text?.toLowerCase() === "replyicon" ? <Replay sx={{ color: 'black' }} />
                                                                                                    :
                                                                                                    m?.content?.text?.toLowerCase() === "priorityicon" ? <PriorityHigh sx={{ color: 'black' }} />
                                                                                                        :
                                                                                                        m?.content?.text?.toLowerCase() === "thumbupicon" ? <ThumbUpAlt sx={{ color: 'black' }} />
                                                                                                            :
                                                                                                            m?.content?.text?.toLowerCase() === "thumbdownicon" ? <ThumbDown sx={{ color: 'black' }} />
                                                                                                                :
                                                                                                                m?.content?.text?.toLowerCase() === "sentimenticon" ? <SentimentDissatisfied sx={{ color: 'black' }} />
                                                                                                                    :
                                                                                                                    ""
                                                                            }
                                                                        </>
                                                                }
                                                            </>
                                                            :
                                                            <Typography sx={{ display: 'inline-block' }} fontSize={14} fontWeight={600}>
                                                                {m?.content?.text}
                                                            </Typography>

                                                    }
                                                    <>
                                                        <div syle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                            {
                                                                m?.content?.audio?.length !== 0 && m?.content?.audio?.map((audio, index) => (
                                                                    <div key={index}>
                                                                        <audio width={'100%'} src={audio?.url} controls> </audio>
                                                                    </div>

                                                                ))
                                                            }
                                                            {
                                                                m?.content?.video?.length !== 0 && m?.content?.video?.map((video, index) => (
                                                                    <div key={index}>
                                                                        <video width={'100%'} src={video?.url} controls> </video>
                                                                    </div>

                                                                ))
                                                            }
                                                            {

                                                                m?.content?.images?.length !== 0 && m?.content?.images?.map((pic, index) => (
                                                                    <div key={index}>
                                                                        <img width={'100%'} alt={pic?.filename} src={pic?.url} />
                                                                    </div>

                                                                ))
                                                            }
                                                            {

                                                                m?.content?.others?.length !== 0 && m?.content?.others?.map((other, index) => (
                                                                    <div key={index}>
                                                                        <DocViewer documents={[{
                                                                            uri:
                                                                                other?.url
                                                                        },]} />
                                                                    </div>

                                                                ))
                                                            }

                                                        </div>
                                                    </>
                                                </Grid>
                                            </>}
                                            
                                        </span>
                                    </div>

                                    {
                                        !moment(m?.updatedAt)?.fromNow()?.includes('hours')
                                        &&
                                        <>
                                            {
                                                !moment(m?.updatedAt)?.fromNow()?.includes('hour')
                                                &&
                                                <>
                                                    {
                                                        !moment(m?.updatedAt)?.fromNow()?.includes('minutes')
                                                        &&
                                                        <>
                                                            {
                                                                !moment(m?.updatedAt)?.fromNow()?.includes('seconds')
                                                                &&
                                                                <Divider>
                                                                    <Chip
                                                                        variant='outlined'
                                                                        size='small'
                                                                        label={`
                                                                ${(new Date(m?.updatedAt))?.toLocaleDateString('en-us', { weekday: "long" })
                                                                            },
                                                                
                                                                ${(new Date(m?.updatedAt))?.toLocaleDateString('en-us', { month: "long" })
                                                                            }
                                                                ${(new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" })
                                                                            }${(parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 31
                                                                                ||
                                                                                (parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 21
                                                                                ||
                                                                                (parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 1
                                                                                ?
                                                                                "st"
                                                                                :
                                                                                (parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 22
                                                                                    ||
                                                                                    (parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 2
                                                                                    ?
                                                                                    "nd"
                                                                                    :
                                                                                    (parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 23
                                                                                        ||
                                                                                        (parseInt((new Date(m?.updatedAt))?.toLocaleDateString('en-us', { day: "numeric" }))) === 3
                                                                                        ?
                                                                                        "rd"
                                                                                        :
                                                                                        "th"

                                                                            // condition style-1
                                                                            // (31==d||21==d||1==d?"st":22==d||2==d?"nd":23==d||3==d?"rd":"th")
                                                                            // condition style-2
                                                                            // n>3&&n<21?"th":n%10==2?"nd":n%10==2?"nd":n%10==3?"rd":"th"
                                                                            }
                                                                `
                                                                        }
                                                                    />
                                                                </Divider>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </>
                                    }

                                </span>
                            ))}
                            {uploads?.loading && <>
                                <Loading />
                            </>}
                            {selectedChat?.chat?.seen?.length !== 0 &&
                                <AvatarGroup style={{ cursor: 'pointer' }} total={selectedChat?.chat?.seen?.length}>
                                    {selectedChat?.chat?.seen?.map((user, i) => (
                                        <Avatar title={user?.firstName + ' ' + user?.lastName} key={i} sx={{ height: '15px', width: '15px', marginTop: '7px' }} alt={user.username} src={user?.pic} />
                                    ))}
                                </AvatarGroup>
                            }
                        </div>
                        {isTyping?.typing && chatExists(selectedChat?.chat?._id, isTyping?.user?.chat) ? <>
                            <TypingIndicator />
                            <div style={{ display: "flex", alignItems: 'center' }}>
                                <Tooltip style={{ cursor: "pointer" }} title={isTyping?.user?.user?.firstName + ' ' + isTyping?.user?.user?.lastName} arrow>
                                    <Avatar sx={{ height: '15px', width: '15px' }} alt={isTyping?.user?.user.username} src={isTyping?.user?.user?.pic} />
                                </Tooltip>
                            </div>
                        </> : <> </>}
                        {groupMessage?.msg?.length === 0 && <DefualtMessage />}
                        {selectedChat?.chat?._id && <Editor isTyping={isTyping} handleTyping={handleTyping} />}
                    </>}
                <SingleProfile caneclBtn="caneclBtn" handleClose={handleClose} handleOpen={handleOpen} open={open} />
            </ScrollableFeed>
        </div>
    )
}

export default ScrollChat