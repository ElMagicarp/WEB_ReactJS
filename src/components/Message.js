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
        <UserAvatar picture={props.author.picture} author={props.author} chanHandler={props.chanHandler}/>
        <div className="msgContent">
            
            <div className="author"> 
                {props.author.name} <div className="date">{date}</div>
            </div>
            <div className="text">{props.content}</div>
        </div>
    </div>
)
}

export default Message;