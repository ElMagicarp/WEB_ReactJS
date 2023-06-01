function ChannelName(props){
    const changeChannel = () => {
        props.chanHandler(props.name);
    }
    return (
        <div className={"channelName" + (props.isSelected ? " active" : "")} onClick={changeChannel}>
            {props.name}
        </div>
    )
}

export default ChannelName;