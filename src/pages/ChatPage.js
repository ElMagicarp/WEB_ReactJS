import React, { useEffect, useState } from "react";
import ChannelBar from "../components/ChannelBar";
import Chat from "../components/Chat";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function ChatPage(props) {
    const [channel, setChannel] = useState("general");
    const [open, setOpen] = useState(false);
    useEffect(() => {
      setOpen((o) => true)
    }, []);
    return (
      <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen((o) => false)}
        message={`Connecté en tant que ${props.user.name}`}
      >
      <Alert severity="success" sx={{ width: '100%' }}>
        Connecté en tant que {props.user.name}
      </Alert>
      </Snackbar>
      <ChannelBar currentChan={channel} chanHandler={setChannel}/>
      <Chat currentChan={channel} currentUser={props.user}/>
      </>
    );
}
  
export default ChatPage;
  