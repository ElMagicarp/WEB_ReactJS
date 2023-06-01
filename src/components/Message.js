function Message(props){
    return (
        <div className="message">
            <div className="author">{props.author}</div>
            <div className="content">{props.content}</div>
        </div>
    )
}

export default Message;