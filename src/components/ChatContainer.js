import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from './Message';

function ChatContainer(props) {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        let request = () => {
            axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/msglist', {
            channel: props.channel
            })
            .then((res) => {
                setMessages(res.data.msgArr)
            })
            .catch((err) => {
                console.log(err)
            });
        }
        request();
        let refresh = window.setInterval(request, 1000);
        return () => {
            window.clearInterval(refresh);
        }
    }, [props.channel])
    return (
      <div className="chatContainer">
      {messages.map((m,index) => <Message author={m.author} key={index} content={m.message}/>)}
      </div>
    );
}
  
export default ChatContainer;