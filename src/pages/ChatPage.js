import React, { useState, useContext, useEffect } from "react";
import ChannelBar from "../components/ChannelBar";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { UserContext } from "../App";
import ChatContainer from "../components/ChatContainer";
import ChatInput from "../components/ChatInput";
import axios from "axios";

function ChatPage(props) {
    const [channel, setChannel] = useState({
        name: "general",
        type: "public"
    });
    const [channelList, setChannelList] = useState({public:[], private:[]});
    const [open, setOpen] = useState(true);
    const user = useContext(UserContext)
    useEffect(() => {
      const requestChannels = () => {
        axios.get('//localhost:'+ process.env.REACT_APP_BACK_PORT +'/api/channelList', {
            headers: {
                Authorization: 'Bearer ' + user.token
            }
        })
        .then((res) => {
          if(res.data.public.length !== channelList.public.length || res.data.private.length !== channelList.private.length){
            setChannelList(() => res.data)
          }
        })
        .catch((err) => {
            console.log(err)
        })
      }
      requestChannels();
      const refreshChannels = setInterval(requestChannels, 1000);
      return () => clearInterval(refreshChannels);
  }, [user, channelList])

    return (
      <div className="chatPage">
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen((o) => false)}
          message={`Connecté en tant que ${user.name}`}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ width: '100%'}}
        >
          <Alert severity="success" sx={{ width: '30%' }} >
            Connecté en tant que {user.name}
          </Alert>
        </Snackbar>
        <div className="leftSide">
          <ChannelBar currentChan={channel} chanHandler={setChannel} chanList={channelList}/>
        </div>
        <div className="rightSide">
            <div className="topSide">
              <ChatContainer channel={channel} chanHandler={setChannel} />
            </div>
            <div className="buttomSide">
              <ChatInput channel={channel} />
            </div>
          
        <div/>
        </div>
      </div>
    );
}
  
export default ChatPage;
  