import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import ScrollChat from './ScrollChat';
import './../ChatMiddle.css'
const ChatBody = ({ handleTyping, isTyping }) => {
    const { groupMessage, auth, } = useSelector(state => state);

    return (
        <div className="chat-body">
            <Header />
            <ScrollChat isTyping={isTyping} handleTyping={handleTyping} messages={groupMessage?.msg} user={auth?.user?.user} />
        </div>
    );
};

export default ChatBody;