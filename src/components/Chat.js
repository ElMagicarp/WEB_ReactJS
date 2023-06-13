import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';

function Chat(props) {
    return (
      <div className="chatWindow">
        <ChatContainer channel={props.currentChan} />
        <ChatInput channel={props.currentChan} />
      </div>
    );
}
  
export default Chat;