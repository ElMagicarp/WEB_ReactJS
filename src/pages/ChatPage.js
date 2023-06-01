import React, { useState } from "react";
import ChannelBar from "../components/ChannelBar";
import Chat from "../components/Chat";

function ChatPage() {
    const [channel, setChannel] = useState("general"); 
    return (
      <>
      <ChannelBar currentChan={channel} chanHandler={setChannel}/>
      <Chat currentChan={channel}/>
      </>
    );
}
  
export default ChatPage;
  