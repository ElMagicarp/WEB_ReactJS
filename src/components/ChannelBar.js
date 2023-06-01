import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChannelName from './ChannelName';

function ChannelBar(props) {
    const [channels, setChannels] = useState([]);
    const currentChannel = props.currentChan;
    useEffect(() => {
        axios.get('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/channelList')
            .then((res) => {
                setChannels(res.data.chanList)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
      <div className="channelBar">
        <div className="header">
            <h1>channels</h1>
        </div>
        <div className="channels">
            {channels.map((chan,index) => <ChannelName name={chan} key={index} isSelected={chan === currentChannel} chanHandler={props.chanHandler}/>)}
        </div>
      </div>
    );
}
  
export default ChannelBar;
  