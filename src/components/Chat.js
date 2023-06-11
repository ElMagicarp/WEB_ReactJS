import ChatContainer from './ChatContainer';
import ChatInput from './ChatInput';

function Chat(props) {
    return (
      <div className="chatWindow">
        {console.log("Chat :" + props.channelList)}
        <ChatContainer channel={props.currentChan} channelList={props.channelList}/>
        <ChatInput channel={props.currentChan} />
      </div>
    );
}
  
export default Chat;