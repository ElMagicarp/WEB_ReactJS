import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Message from './Message';

function ChatContainer(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const container = document.getElementsByClassName("chatContainer")[0];
        container.scrollTop = container.scrollHeight;
    }, [messages])
    
    useEffect(() => {
        let request = (scroll) => {
            axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/msglist', {
                channel: props.channel
            })
            .then((res) => {
                let newMessages = res.data.msgArr;
                if (newMessages.length !== messages.length){
                    setMessages((m) => newMessages);
                }
            })
            .catch((err) => {
                console.log(err)
            });
        }
        request(true);
        let refresh = window.setInterval(request, 1000);
        return () => {
            window.clearInterval(refresh);
        }
    }, [props.channel, messages])

    return (
      <div className="chatContainer">
      {messages.map((m,index) => <Message author={m.author} key={index} content={m.message} picture={m.picture} timestamp={m.createdAt}/>)}
      </div>
    );
}
  
export default ChatContainer;