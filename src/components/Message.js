import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";

function Message(props){
    const [date, setDate] = useState('');
    useEffect(() => {
        let d = new Date(props.timestamp);
        let day = d.getDate();
        let month = d.getMonth();
        let h = d.getHours();
        let m = d.getMinutes();
        setDate(() => day + "/" + month + " à " + h + ":" + m);
    }, [props.timestamp])

    return (
        <div className="message">
            <Avatar alt={props.author} src={props.picture} sx={{ width: 50, height: 50}} />
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