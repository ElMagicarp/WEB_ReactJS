import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Message from './Message';
import { UserContext } from "../App";

function ChatContainer(props) {
    const [messages, setMessages] = useState([]);
    const user = useContext(UserContext);

    useEffect(() => {
        const container = document.getElementsByClassName("chatContainer")[0];
        container.scrollTop = container.scrollHeight;
    }, [messages])
    
    useEffect(() => {
        let request = () => {
            axios.post('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/msglist', 
            {
                channel: props.channel
            },{
                headers: {
                    authorization: 'Bearer ' + user.token
                }
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
        request();
        let refresh = window.setInterval(request, 1000);
        return () => {
            window.clearInterval(refresh);
        }
    }, [props.channel, messages, user])

    return (
      <div className="chatContainer">
      {messages.map((m,index) => <Message author={m.author.name} key={index} content={m.message} picture={m.author.picture} timestamp={m.createdAt} />)}
      </div>
    );
}
  
export default ChatContainer;