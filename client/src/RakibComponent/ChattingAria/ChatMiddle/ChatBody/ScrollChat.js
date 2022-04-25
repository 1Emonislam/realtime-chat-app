import { Avatar, AvatarGroup, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import { useSelector } from 'react-redux'
import ScrollableFeed from 'react-scrollable-feed'
import MessageFunc from '../ChatBody/MessageFunc'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameSenderPermission, isSameUser } from './chatLogic'
import EditorLogicMessage from './EditorLogicMessage'
function ScrollChat({ messages, user }) {
    const { selectedChat } = useSelector(state => state)
    // console.log(selectedChat)
    return (
        <ScrollableFeed >
            <div style={{ marginTop: "50px" }}>


                {messages &&
                    messages.map((m, i) => (
                        <span key={i}>
                            <div style={{ display: "flex", alignItems: 'center', marginBottom: '10px' }}>
                                <div>

                                    {(isSameSender(messages, m, i, user._id) ||
                                        isLastMessage(messages, i, user._id)) && (
                                            <Tooltip title={m?.sender?.firstName + ' ' + m?.sender?.lastName}
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
                                        {user?._id && <MessageFunc isSameSenderPermission={isSameSenderPermission(messages, m, i, user?._id)} message={m?.content?.text} messageInfo={m} />}
                                    </span>
                                    {m?.content?.text && <>
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
                                            <EditorLogicMessage data={m?.content?.text} />
                                        </div>
                                    </>}

                                </span>


                            </div>

                        </span>
                    ))}
                {selectedChat?.seen?.length &&
                    <AvatarGroup style={{ cursor: 'pointer' }} max={3}>
                        {selectedChat?.seen?.slice(0, 3)?.map((user, i) => (
                            <Avatar title="seen" key={i} sx={{ height: '15px', width: '15px', marginTop: '7px' }} alt={user.username} src={user?.pic} />
                        ))}
                    </AvatarGroup>
                }
            </div>
        </ScrollableFeed>
    )
}

export default ScrollChat