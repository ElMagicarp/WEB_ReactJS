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
                name: props.channel.name,
                type: props.channel.type
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
        let refresh = setInterval(request, 1000);
        return () => {
            clearInterval(refresh);
        }
    }, [props.channel, messages, user])

    return (
      <div className="chatContainer">
      {messages.map((m,index) => <Message author={m.author} key={index} content={m.message} timestamp={m.createdAt} chanHandler={props.chanHandler}/>)}
      </div>
    );
}
  
export default ChatContainer;