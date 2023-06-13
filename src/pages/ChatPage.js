import React, { useState, useContext } from "react";
import ChannelBar from "../components/ChannelBar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UserContext } from "../App";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";

function ChatPage(props) {
    const [channel, setChannel] = useState({
        name: "general",
        type: "public"
    });
    const [open, setOpen] = useState(true);
    const user = useContext(UserContext)
    return (
      <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen((o) => false)}
        message={`Connecté en tant que ${user.name}`}
      >
      <Alert severity="success" sx={{ width: '100%' }}>
        Connecté en tant que {user.name}
      </Alert>
      </Snackbar>
      <ChannelBar currentChan={channel} chanHandler={setChannel} />
      <div className="chatWindow">
      <ChatContainer channel={channel} chanHandler={setChannel} />
      <ChatInput channel={channel} />
      </div>
      </>
    );
}
  
export default ChatPage;
  