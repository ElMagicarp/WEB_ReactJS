import React, { useState } from "react";
import ChannelBar from "../components/ChannelBar";
import Chat from "../components/Chat";

function ChatPage() {
    const [channel, setChannel] = useState("general"); 
    const [user, setUser] = useState("");
    return (
      <>
      <ChannelBar currentChan={channel} chanHandler={setChannel}/>
      <Chat currentChan={channel} currentUser={user}/>
      </>
    );
}
  
export default ChatPage;
  