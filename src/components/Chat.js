import ChatContainer from './ChatContainer';

function Chat(props) {
    return (
      <div className="chatWindow">
        <ChatContainer channel={props.currentChan}/>
      </div>
    );
}
  
export default Chat;