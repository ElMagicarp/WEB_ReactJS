import React, { useState, useContext } from "react";
import ChannelBar from "../components/ChannelBar";
import Chat from "../components/Chat";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UserContext } from "../App";

function ChatPage(props) {
    const [channel, setChannel] = useState("general");
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
      <Chat currentChan={channel} />
      </>
    );
}
  
export default ChatPage;
  