import { useSelector } from 'react-redux';
import ScrollChat from './ScrollChat';
const ChatBody = ({ handleTyping, isTyping }) => {
    const { groupMessage, auth, } = useSelector(state => state);

    return (
        <div className="chat-body">
            <ScrollChat isTyping={isTyping} handleTyping={handleTyping} messages={groupMessage?.msg} user={auth?.user?.user} />
        </div>
    );
};

export default ChatBody;