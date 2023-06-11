import React, { useEffect, useState, useContext } from "react";
import ChannelBar from "../components/ChannelBar";
import Chat from "../components/Chat";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UserContext } from "../App";

function ChatPage(props) {
    const [channel, setChannel] = useState("general");
    const [channels,setChannels] = useState([]);
    const [open, setOpen] = useState(false);
    const user = useContext(UserContext)
    useEffect(() => {
      setOpen((o) => true)
    }, []);
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
      <ChannelBar currentChan={channel} chanHandler={setChannel} setChannels={(arg) => setChannels(arg)} channels ={channels}/>
      {console.log("ChatPage :" + channels)}
      <Chat currentChan={channel} channelList={channels}/>
      </>
    );
}
  
export default ChatPage;
  