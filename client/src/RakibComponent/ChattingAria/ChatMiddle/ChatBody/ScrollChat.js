import { Avatar, AvatarGroup, Tooltip } from '@mui/material'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import { generateHTML } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import htmlParser from 'html-react-parser'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ScrollableFeed from 'react-scrollable-feed'
import { getSeenUser, isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from './chatLogic'
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
                                        sx={{ cursor: 'pointer' }}
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />

                                </Tooltip>
                            )}
                        <span
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#1c9dea" : "#e5edf5"
                                    }`,
                                color: `${m.sender._id === user._id ? "white" : "#223645"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "20px",
                                padding: "5px 15px",
                            }}
                        >
                            <div style={{ display: 'flex' }}>
                                {htmlParser(generateHTML(m?.content?.text, [
                                    Document,
                                    StarterKit, Underline, Link,
                                ]))}
                            </div> <span> <BsThreeDotsVertical /></span>











































                            {m?.chat?.seen?.length !== 0 && !getSeenUser(m?.chat?.seen, user)?.length && <AvatarGroup max={4} total={getSeenUser(m?.chat?.seen, user)?.length}>
                                {getSeenUser(m?.chat?.seen, user).map((user, i) => (
                                    <Avatar key={i} sx={{ height: '18px', width: '18px', marginTop: '3px' }} alt={user.firstName} src={user?.pic} />
                                ))}
                            </AvatarGroup>}
                        </span>
                    </div>
                ))}
        </ScrollableFeed>
    )
}

export default ScrollChat