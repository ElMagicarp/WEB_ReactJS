import { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar"

const twoDigits = (n) => {
    if (Math.log(n) / Math.log(10) < 1) {
        return "0" + n;
    }
    return n;
}

function Message(props){
    const [date, setDate] = useState('');
    useEffect(() => {
        let d = new Date(props.timestamp);
        let day = twoDigits(d.getDate());
        let month = twoDigits(d.getMonth());
        let h = twoDigits(d.getHours());
        let m = twoDigits(d.getMinutes());
        setDate(() => day + "/" + month + " à " + h + ":" + m);
    }, [props.timestamp])

    return (
        <div className="message">
        {console.log("Message :" + props.channelList)}
        <UserAvatar picture={props.picture} author={props.author} />
        <div className="msgContent">
            
            <div className="author"> 
                {props.author} <div className="date">{date}</div>
            </div>
            <div className="text">{props.content}</div>
        </div>
    </div>
)
}

export default Message;