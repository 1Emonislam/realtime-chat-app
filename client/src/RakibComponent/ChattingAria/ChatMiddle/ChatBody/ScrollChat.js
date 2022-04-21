import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import ScrollableFeed from 'react-scrollable-feed'
import MessageFunc from '../ChatBody/MessageFunc'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './chatLogic'
import EditorLogicMessage from './EditorLogicMessage'
function ScrollChat({ messages, user }) {
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip title={m?.sender?.firstName + ' ' + m?.sender?.lastName} placement="bottom-start" aria-haspopup arrow>
                                    <Avatar
                                        sx={{ cursor: 'pointer', marginTop: '7px', marginRight: '25px' }}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m?.sender?._id === user?._id ? "#1c9dea" : "#e5edf5"
                                    }`,
                                color: `${m?.sender?._id === user?._id ? "white" : "#223645"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user?._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "6px 15px",
                                display: 'flex'
                            }}
                        >
                            <span style={{ position: 'relative', right: '35px', color: 'blue', fontWeight: '900' }}>
                                {user._id && <MessageFunc message={m?.content?.text} />}
                            </span>
                            {m?.content?.text && <EditorLogicMessage data={m?.content?.text} />}
                        </span>
                        {m?.seen?.length && <AvatarGroup max={3} total={m?.seen?.length}>
                            {m?.seen?.slice(0, 3)?.map((user, i) => (
                                <>
                                    {/* {console.log(user)} */}
                                    <Avatar key={i} sx={{ height: '18px', width: '18px', marginTop: '3px' }} alt={user.username} src={user?.pic} />
                                </>

                            ))}
                        </AvatarGroup>}

                    </div>
                ))}
        </ScrollableFeed>
    )
}

export default ScrollChat