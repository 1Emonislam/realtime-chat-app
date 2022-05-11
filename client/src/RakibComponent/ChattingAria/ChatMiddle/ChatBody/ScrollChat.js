import { Avatar, AvatarGroup, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import Loading from '../../../../components/Spinner/Loading'
import TypingIndicator from '../../../../components/Typing/TypingIndicatior'
import Editor from '../../../../Editor/Editor'
import MessageFunc from '../ChatBody/MessageFunc'
import { chatExists, isLastMessage, isSameSender, isSameSenderMargin, isSameSenderPermission, isSameUser } from './chatLogic'
function ScrollChat({ messages, user, handleTyping, isTyping }) {
    const { selectedChat, groupMessage } = useSelector(state => state);
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages]);
    return (
        <ScrollableFeed style={{scrollbarWidth: 'none'}}>
            {groupMessage?.loading ? <Loading style={{ marginTop: "50px" }} /> : <>
                <div style={{ marginTop: "50px" }}>
                    {messages?.length !== 0 && messages?.length && messages?.map((m, i) => (
                        <span key={i}>
                            <div style={{ display: "flex", alignItems: 'center', marginBottom: '10px' }} ref={messagesEndRef}>
                                <div>

                                    {(isSameSender(messages, m, i, user._id) ||
                                        isLastMessage(messages, i, user._id)) && (
                                            <Tooltip style={{ cursor: "pointer" }} title={m?.sender?.firstName + ' ' + m?.sender?.lastName}
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
                                        padding: "14px 20px",
                                        fontWeight: "500"
                                    }}
                                >
                                    <span style={{ position: 'absolute', left: '-20px', top: '18px', color: 'blue', fontWeight: '900' }}>
                                        {user?._id && <MessageFunc handleTyping={handleTyping} isTyping={isTyping} isSameSenderPermission={isSameSenderPermission(messages, m, i, user?._id)} message={m?.content?.text} messageInfo={m} />}
                                    </span>
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
                                                {moment(m?.updatedAt).fromNow()}
                                            </Typography>
                                        </div>
                                        <div>
                                            {/* <EditorLogicMessage data={m?.content?.text} /> */}
                                            {m?.content?.text && <span>{m?.content?.text} </span>}
                                            {m?.content?.audio?.length !== 0 && <span> {m?.content?.audio?.map((el, index) => (
                                                <span key={index}>
                                                    <audio src={el} controls />
                                                </span>
                                            ))}</span>}
                                            {m?.content?.video?.length !== 0 && <span> {m?.content?.video?.map((el, index) => (
                                                <span key={index}>
                                                    <video src={el} controls />
                                                </span>
                                            ))}</span>}
                                            {m?.content?.images?.length !== 0 && <span> {m?.content?.images?.map((el, index) => (
                                                <span key={index}>
                                                    <img src={el} alt="" />
                                                </span>
                                            ))}</span>}
                                        </div>
                                    </>}
                                </span>
                            </div>
                        </span>
                    ))}
                    {selectedChat?.chat?.seen?.length &&
                        <AvatarGroup style={{ cursor: 'pointer' }} total={selectedChat?.chat?.seen?.length}>
                            {selectedChat?.chat?.seen?.map((user, i) => (
                                <Avatar title="seen" key={i} sx={{ height: '15px', width: '15px', marginTop: '7px' }} alt={user.username} src={user?.pic} />
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
                {selectedChat?.chat?._id && <Editor isTyping={isTyping} handleTyping={handleTyping} />}
            </>}
        </ScrollableFeed>
    )
}

export default ScrollChat